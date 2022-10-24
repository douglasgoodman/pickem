import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface AvatarWithNameProps {
    firstName: string;
    lastName: string;
    imageUrl?: string;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
    firstName,
    lastName,
    imageUrl,
}) => {
    const name = `${firstName} ${lastName}`;
    const initials = `${firstName[0]}${lastName[0]}`;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: '1rem' }}>{name}</Typography>
            <Avatar alt={name} src={imageUrl}>
                {initials}
            </Avatar>
        </Box>
    );
};
