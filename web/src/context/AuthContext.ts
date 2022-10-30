import React from 'react';
import { UserDocument } from '@pickem/types';

export interface AuthContextType {
    user: UserDocument | undefined;
    signIn: () => void;
    signOut: () => void;
    setAuthenticatedUser: (user: UserDocument) => void;
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
