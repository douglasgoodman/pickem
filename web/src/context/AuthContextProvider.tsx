import React from 'react';
import axios from 'axios';
import { AuthContext, AuthContextType } from './AuthContext';
import { HasChildren } from '../types';
import { environment } from '../environment';
import { UserDocument } from '@pickem/types';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { useLocalStorage } from '../hooks/useLocalStorage';

const authFetchUrl = '/auth/fetch';
const authStartUrl = '/auth/start';
const signOutUrl = '/auth/signout';

export type AuthContextProviderProps = HasChildren;

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: environment.apiDomain,
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const localStorage = useLocalStorage();
    const [user, setUser] = React.useState<UserDocument>();

    const { loading: fetchInProgress } = useAsync(async () => {
        const response = await axiosInstance.get<{ user: UserDocument }>(
            authFetchUrl,
            {
                withCredentials: true,
            }
        );
        const userDocument = response.data.user;
        localStorage.set<string>('signInHint', userDocument.email);
        setUser(userDocument);
    }, []);

    const { loading: signInInProgress, execute: signIn } = useAsyncCallback(
        async (path?: string) => {
            const hint = localStorage.get<string>('signInHint');
            const response = await axiosInstance.get<{ url: string }>(
                authStartUrl,
                {
                    withCredentials: true,
                    params: { path, hint },
                }
            );
            location.href = response.data.url;
        }
    );

    const { loading: signOutInProgress, execute: signOut } = useAsyncCallback(
        async () => {
            await axiosInstance.get(signOutUrl, { withCredentials: true });
            location.href = '/';
        }
    );

    const inProgress = fetchInProgress || signInInProgress || signOutInProgress;

    const context: AuthContextType = {
        inProgress,
        user,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};
