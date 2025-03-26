import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../features/auth/authSlice';

interface NavigationBarProps {
    toggleSidebar: () => void;
}



const NavigationBar: React.FC<NavigationBarProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                height: '60px',
                backgroundColor: '#333',
                padding: '0 16px',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%',
                    padding: 0,
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexGrow: 1,
                    }}
                >
                    <Button
                        onClick={toggleSidebar}
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            width: 'auto',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                    >
                        Menu
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Products
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                        onClick={() => navigate('/categories')}
                    >
                        Categories
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                    >
                        About
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                        onClick={() => navigate('/user')}
                    >
                        User
                    </Button>
                    {user ? (
                        <Button onClick={handleLogout} sx={{ /* styles */ }}>
                            Logout ({user.username})
                        </Button>
                    ) : (
                        <Button onClick={() => navigate('/login')} sx={{ /* styles */ }}>
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
