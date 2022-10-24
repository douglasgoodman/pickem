import React from 'react';
import { useAuthContext, User } from '../context/AuthContext';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { FlexFill } from '../components/FlexFill';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const AuthComplete: React.FC = () => {
    const { setAuthenticatedUser } = useAuthContext();
    const [params] = useSearchParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const data = params.get('data');
        const user = JSON.parse(data!) as User;
        setAuthenticatedUser(user);
        navigate('/');
    }, []);

    return (
        <LoadingOverlay isLoading={true}>
            <FlexFill
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            ></FlexFill>
        </LoadingOverlay>
    );
};
