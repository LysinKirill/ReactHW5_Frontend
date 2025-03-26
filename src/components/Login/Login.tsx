import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../features/auth/authSlice';
import {TextField, Button, Box, Typography, Alert, Link} from '@mui/material';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(login({ username, password }));
        if (login.fulfilled.match(result)) {
            console.log("NAVIGATE TO MAIN");
            navigate('/');
        }
    };

    return (
        <Box sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 8,
            p: 3,
            backgroundColor: '#121212', // Dark background
            borderRadius: 2,
            boxShadow: 3
        }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: 'white' }} // White title
            >
                Login
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
                        '& .MuiInputBase-input': {
                            color: 'white', // White input text
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // White label
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white', // White border
                            },
                            '&:hover fieldset': {
                                borderColor: '#90caf9', // Light blue on hover
                            },
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
                        '& .MuiInputBase-input': {
                            color: 'white', // White input text
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // White label
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white', // White border
                            },
                            '&:hover fieldset': {
                                borderColor: '#90caf9', // Light blue on hover
                            },
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: '#1976d2', // Blue button
                        '&:hover': {
                            backgroundColor: '#1565c0', // Darker blue on hover
                        }
                    }}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Logging in...' : 'Login'}
                </Button>
            </form>
            <Typography sx={{ mt: 2, color: 'white' }}>
                Don't have an account?{' '}
                <Link
                    href="/register"
                    sx={{ color: '#90caf9', cursor: 'pointer' }}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/register');
                    }}
                >
                    Register here
                </Link>
            </Typography>
        </Box>

    );
};

export default Login;