import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UnauthorizedPageProps {
    requiredGroups: string[];
}

const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({ requiredGroups }) => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4">Unauthorized Access</Typography>
            <Typography>
                You don't have permission to view this page. Required groups: {requiredGroups.join(', ')}
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
            >
                Go Home
            </Button>
        </div>
    );
};

export default UnauthorizedPage;