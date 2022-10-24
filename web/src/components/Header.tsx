import React from 'react';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { PaletteMode } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import { AvatarWithName } from './AvatarWithName';
import footballImage from '../images/football.png';
import thumbsUpImage from '../images/thumbsup.png';

export interface HeaderProps {
    paletteMode: PaletteMode;
    togglePaletteMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    paletteMode,
    togglePaletteMode,
}) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const signIn = () => {
        navigate('/signin');
    };

    const imageSx = { height: '24px', width: '24px' };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box component="img" src={thumbsUpImage} sx={imageSx} />
                <Box component="img" src={footballImage} sx={imageSx} />
                <Box component="img" src={footballImage} sx={imageSx} />
                <Box
                    component="img"
                    src={thumbsUpImage}
                    sx={{ ...imageSx, transform: 'scaleX(-1)' }}
                />
                <Typography
                    component="div"
                    sx={{ flexGrow: 1, marginLeft: '1rem' }}
                >
                    Send Picks
                </Typography>
                {!!user ? (
                    <AvatarWithName
                        firstName={user.given_name}
                        lastName={user.family_name}
                        imageUrl={user.picture}
                    />
                ) : (
                    <Button onClick={signIn}>Sign in</Button>
                )}
                <IconButton size="large" onClick={togglePaletteMode}>
                    {paletteMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
