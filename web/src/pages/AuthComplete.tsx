import React from 'react';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { FlexFill } from '../components/FlexFill';

export const AuthComplete: React.FC = () => {
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
