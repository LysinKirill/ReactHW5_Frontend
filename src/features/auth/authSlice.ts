import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth';
import { RootState } from '../../store/store';

interface AuthState {
    user: {
        id: number;
        username: string;
        email: string;
        group: string;
        avatar_url?: string;
    } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null
};

export const register = createAsyncThunk(
    'auth/register',
    async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await authApi.register(userData);
            if(response.status != 204 && response.status != 201) {
                try {
                    const failureReason = response.data.errors.length
                    return rejectWithValue(failureReason.toString());
                } catch {
                    return rejectWithValue('Registration failed');
                }
            }
            return response.data.user;
        } catch (error) {
            if(error.status === 409) {
                return rejectWithValue('Registration failed: User with the same name or email already registered');
            }
            try {
                const failureReason = error.response.data.errors[0].msg
                return rejectWithValue("Registration failed. Reason: " + failureReason.toString());
            } catch {
                return rejectWithValue('Registration failed');
            }
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await authApi.login(credentials);
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.user;
        } catch (error) {
            return rejectWithValue('Login failed');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await authApi.logout();
});

export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authApi.refresh();
            return response.data.user;
        } catch (error) {
            return rejectWithValue('Session expired');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;

export default authSlice.reducer;
export const { clearError } = authSlice.actions;