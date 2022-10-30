import React from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { HasChildren } from '../types';
import { environment } from '../environment';
import { UserDocument } from '@pickem/types';
import { useAsync } from 'react-async-hook';
import { LoadingOverlay } from '../components/LoadingOverlay';

const authStartUrl = `${environment.apiHost}/auth/start`;
const signOutUrl = `${environment.apiHost}/auth/signout`;

export type AuthContextProviderProps = HasChildren;

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = React.useState<UserDocument>();

    const rrr = useAsync(async () => {
        const fetchUrl = `${environment.apiHost}/auth/fetch`;
        const response = await fetch(fetchUrl, { credentials: 'include' });
        const json = await response.json();
        const userDocument = json.user as UserDocument;
        setUser(userDocument);
    }, []);

    const signIn = () => {
        location.href = authStartUrl;
    };

    const signOut = () => {
        location.href = signOutUrl;
    };

    const context: AuthContextType = {
        user,
        signIn,
        signOut,
        setAuthenticatedUser: setUser,
    };

    return (
        <LoadingOverlay isLoading={rrr.loading}>
            <AuthContext.Provider value={context}>
                {children}
            </AuthContext.Provider>
        </LoadingOverlay>
    );
};
