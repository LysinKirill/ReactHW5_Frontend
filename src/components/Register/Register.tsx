import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import {clearError, register} from '../../features/auth/authSlice.ts';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        const result = await dispatch(register({ username, email, password }));
        if (register.fulfilled.match(result)) {
            dispatch(clearError());
            navigate('/login');
        }
    };

    return (
        <Box sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 8,
            p: 3,
            backgroundColor: '#121212',
            borderRadius: 2,
            boxShadow: 3
        }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                Register
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: '#90caf9' },
                        }
                    }}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: '#90caf9' },
                        }
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: '#90caf9' },
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Registering...' : 'Register'}
                </Button>
            </form>
            <Typography sx={{ mt: 2, color: 'white' }}>
                Already have an account?{' '}
                <Link
                    href="/login"
                    sx={{ color: '#90caf9', cursor: 'pointer' }}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/login');
                    }}
                >
                    Login here
                </Link>
            </Typography>
        </Box>
    );
};

export default Register;