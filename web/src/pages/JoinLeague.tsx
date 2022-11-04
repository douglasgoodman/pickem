import React from 'react';
import { useParams } from 'react-router-dom';
import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const JoinLeague: React.FC = () => {
    const { id } = useParams<'id'>();

    React.useEffect(() => {
        document.title = 'Send Picks - Join a league';
    }, []);

    if (!!id) {
        return <Container>Let's join league {id}</Container>;
    }
    return (
        <Container>
            <Typography variant="h5">League stuff!</Typography>
        </Container>
    );
};
