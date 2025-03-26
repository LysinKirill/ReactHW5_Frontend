import React from 'react';
import { Paper } from "@mui/material";
import { useAppSelector } from '../../store/hooks';

interface UserProfileProps {
    // Optional props if you still want to allow overriding from parent
    name?: string;
    email?: string;
    group?: string;
    avatarUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
    // Get user data from Redux store
    const user = useAppSelector((state) => state.auth.user);

    // Use props if provided, otherwise use Redux store data
    const displayName = props.name || user?.username || 'Не указано';
    const displayEmail = props.email || user?.email || 'Не указано';
    const displayGroup = props.group || user?.group || 'Не указано';
    const displayAvatar = props.avatarUrl || user?.avatar_url || '/default-avatar.png';

    return (
        <Paper elevation={3} sx={{ maxWidth: 800, margin: '20px auto', padding: 3 }}>
            <div className="user-profile">
                <h2>Профиль пользователя</h2>
                <div className="profile-info">
                    <div className="avatar">
                        <img
                            src={displayAvatar}
                            alt="Avatar"
                            className="avatar-img"
                            style={{ width: 100, height: 100, borderRadius: '50%' }}
                        />
                    </div>
                    <div className="user-details">
                        <p><strong>Имя:</strong> {displayName}</p>
                        <p><strong>Email:</strong> {displayEmail}</p>
                        <p><strong>Группа:</strong> {displayGroup}</p>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default UserProfile;