import React from 'react';
import Google from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuthContext } from '../context/AuthContext';
import { FlexFill } from '../components/FlexFill';

export const SignIn: React.FC = () => {
    const { signIn } = useAuthContext();

    return (
        <FlexFill
            sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography>
                Send Picks uses your Google account for sign in.
            </Typography>
            <Button variant="contained" startIcon={<Google />} onClick={signIn}>
                Sign in with Google
            </Button>
        </FlexFill>
    );
};
