import React from 'react';
import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const NoMatch: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Send Picks - Page not found';
    }, []);

    return (
        <Container>
            <FlexFill
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Typography variant="h2">
                    I can't find that page anywhere!
                </Typography>
            </FlexFill>
        </Container>
    );
};
