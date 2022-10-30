import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { FlexFill } from '../components/FlexFill';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const AuthComplete: React.FC = () => {
    const { setAuthenticatedUser } = useAuthContext();
    const [params] = useSearchParams();
    const navigate = useNavigate();

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
