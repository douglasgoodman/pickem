import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface AvatarWithNameProps {
    firstName: string;
    lastName: string;
    imageUrl?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
    firstName,
    lastName,
    imageUrl,
    onClick,
}) => {
    const name = `${firstName} ${lastName}`;
    const initials = `${firstName[0]}${lastName[0]}`;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: '1rem' }}>{name}</Typography>
            <Tooltip title="Account settings">
                <IconButton onClick={onClick}>
                    <Avatar alt={name} src={imageUrl}>
                        {initials}
                    </Avatar>
                </IconButton>
            </Tooltip>
        </Box>
    );
};
