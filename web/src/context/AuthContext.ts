import React from 'react';

export interface User {
    email: string;
    family_name: string;
    gender?: string | null;
    given_name: string;
    hd?: string | null;
    id: string;
    link?: string | null;
    locale?: string | null;
    name: string;
    picture?: string | undefined;
    verified_email?: boolean | null;
}

export interface AuthContextType {
    user: User | undefined;
    signIn: () => void;
    signOut: () => void;
    setAuthenticatedUser: (user: User) => void;
}

const notMountedFunction = () => {
    throw new Error();
};

export const AuthContext = React.createContext<AuthContextType>({
    user: undefined,
    signIn: notMountedFunction,
    signOut: notMountedFunction,
    setAuthenticatedUser: notMountedFunction,
});

export const useAuthContext = (): AuthContextType =>
    React.useContext(AuthContext);
