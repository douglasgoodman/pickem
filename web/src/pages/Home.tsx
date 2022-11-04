import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FlexFill } from '../components/FlexFill';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';

export const Home: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Send Picks - Home';
    }, []);

    return (
        <Container>
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
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/league/create"
                        >
                            Create a league
                        </Button>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/league/join"
                        >
                            Join a league
                        </Button>
                    </ButtonGroup>
                </Box>
            </FlexFill>
        </Container>
    );
};
