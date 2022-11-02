import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { PaletteMode } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import { AvatarWithName } from './AvatarWithName';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import footballImage from '../images/football.png';
import thumbsUpImage from '../images/thumbsup.png';
import cameraImage from '../images/camera.png';

export interface HeaderProps {
    paletteMode: PaletteMode;
    togglePaletteMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    paletteMode,
    togglePaletteMode,
}) => {
    const { user, signOut } = useAuthContext();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const imageSx = { height: '24px', width: '24px' };

    const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAvatarMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box
                    component="img"
                    src={thumbsUpImage}
                    sx={{ ...imageSx, transform: 'scaleX(-1)' }}
                />
                <Box component="img" src={footballImage} sx={imageSx} />
                <Box component="img" src={footballImage} sx={imageSx} />
                <Box component="img" src={thumbsUpImage} sx={imageSx} />
                <Box component="img" src={cameraImage} sx={imageSx} />
                <Typography
                    component="div"
                    sx={{ flexGrow: 1, marginLeft: '1rem' }}
                >
                    Send Picks
                </Typography>
                {!!user ? (
                    <>
                        <AvatarWithName
                            firstName={user.firstName}
                            lastName={user.lastName}
                            imageUrl={user.userImageUrl}
                            onClick={handleAvatarClick}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleAvatarMenuClose}
                        >
                            <MenuItem>My account</MenuItem>
                            <MenuItem onClick={signOut}>Sign out</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button component={RouterLink} to="/signin">
                        Sign in
                    </Button>
                )}
                <Tooltip
                    title={`Toggle ${
                        paletteMode === 'dark' ? 'light' : 'dark'
                    } mode`}
                >
                    <IconButton size="large" onClick={togglePaletteMode}>
                        {paletteMode === 'dark' ? (
                            <Brightness7 />
                        ) : (
                            <Brightness4 />
                        )}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};
