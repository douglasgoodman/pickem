import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FlexFill } from '../components/FlexFill';

export const Home: React.FC = () => {
    return (
        <FlexFill
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography>Welcome to Send Picks</Typography>
                <ButtonGroup>
                    <Button variant="contained">Create a league</Button>
                    <Button variant="contained">Join a league</Button>
                </ButtonGroup>
            </Box>
        </FlexFill>
    );
};
