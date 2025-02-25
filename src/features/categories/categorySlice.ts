import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { categoryApi } from '../../api/categories';
import { ICategoryProps } from '../../components/ProductList/types';

interface CategoryState {
    categories: ICategoryProps[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CategoryState = {
    categories: [],
    status: 'idle',
};

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
    const response = await categoryApi.getAll();
    return response.data;
});

export const addNewCategory = createAsyncThunk('categories/add', async (category: Omit<ICategoryProps, 'id'>, { rejectWithValue }) => {
    try {
        const response = await categoryApi.create(category);
        return response.data;
    } catch {
        return rejectWithValue('Failed to add category');
    }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (category_id: number, { rejectWithValue }) => {
    try {
        const response = await categoryApi.delete(category_id);
        return response.data;
    } catch {
        return rejectWithValue('Failed to delete category');
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategoryProps[]>) => {
            state.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;