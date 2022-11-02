import React from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { HasChildren } from '../types';
import { environment } from '../environment';
import { UserDocument } from '@pickem/types';
import { useAsync } from 'react-async-hook';
import { LoadingOverlay } from '../components/LoadingOverlay';

const authFetchUrl = `${environment.apiDomain}/auth/fetch`;
const authStartUrl = `${environment.apiDomain}/auth/start`;
const signOutUrl = `${environment.apiDomain}/auth/signout`;

export type AuthContextProviderProps = HasChildren;

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = React.useState<UserDocument>();

    const { loading } = useAsync(async () => {
        const response = await fetch(authFetchUrl, { credentials: 'include' });
        const json = await response.json();
        const userDocument = json.user as UserDocument;
        setUser(userDocument);
    }, []);

    const signIn = async () => {
        const response = await fetch(authStartUrl, { credentials: 'include' });
        const responseObject = await response.json();
        location.href = responseObject.url;
    };

    const signOut = async () => {
        await fetch(signOutUrl, { credentials: 'include' });
        location.href = '/';
    };

    const context: AuthContextType = {
        user,
        signIn,
        signOut,
        setAuthenticatedUser: setUser,
    };

    return (
        <LoadingOverlay isLoading={loading}>
            <AuthContext.Provider value={context}>
                {children}
            </AuthContext.Provider>
        </LoadingOverlay>
    );
};
