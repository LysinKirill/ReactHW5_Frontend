import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import {clearError, register} from '../../features/auth/authSlice.ts';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Link,
    InputLabel,
    FormControl,
    Select,
    InputAdornment, IconButton, MenuItem
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar_url, setAvatarUrl] = useState<string>('');
    const [password, setPassword] = useState('');
    const [group, setGroup] = useState('admin');
    const [customGroup, setCustomGroup] = useState('');
    const [showCustomGroupInput, setShowCustomGroupInput] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useAppSelector((state) => state.auth);

    const predefinedGroups = ['user', 'editor', 'contributor', 'admin'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        const result = await dispatch(register({ username, email, password, avatar_url }));
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
                <TextField
                    label="Avatar URL"
                    fullWidth
                    margin="normal"
                    value={avatar_url}
                    onChange={(e) => setAvatarUrl(e.target.value)}
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
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel sx={{ color: 'white' }}>User Group</InputLabel>
                    <Select
                        value={group}
                        onChange={(e) => {
                            if (e.target.value === 'custom') {
                                setShowCustomGroupInput(true);
                            } else {
                                setShowCustomGroupInput(false);
                            }
                            setGroup(e.target.value as string);
                        }}
                        label="User Group"
                        sx={{
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                        }}
                    >
                        {predefinedGroups.map((grp) => (
                            <MenuItem key={grp} value={grp}>{grp}</MenuItem>
                        ))}
                        <MenuItem value="custom">Custom Group</MenuItem>
                    </Select>
                </FormControl>

                {showCustomGroupInput && (
                    <TextField
                        label="Custom Group"
                        fullWidth
                        margin="normal"
                        value={customGroup}
                        onChange={(e) => setCustomGroup(e.target.value)}
                        sx={{
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: '#90caf9' },
                            }
                        }}
                        InputProps={{
                            endAdornment: customGroup && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setCustomGroup('')}
                                        edge="end"
                                    >
                                        <CloseIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                )}
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