import React from 'react';
import { AuthContext, AuthContextType, User } from './AuthContext';
import { HasChildren } from '../types';

const authStartUrl = 'http://localhost:3001/auth/start';
const signOutUrl = 'http://localhost:3001/auth/signout';

export type AuthContextProviderProps = HasChildren;

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = React.useState<User>();

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
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};
