import React from 'react';
import { UserDocument } from '@pickem/types';

export interface AuthContextType {
    user: UserDocument | undefined;
    inProgress: boolean | undefined;
    signIn: (path?: string) => void;
    signOut: () => void;
}

const notMountedFunction = () => {
    throw new Error();
};

export const AuthContext = React.createContext<AuthContextType>({
    user: undefined,
    inProgress: undefined,
    signIn: notMountedFunction,
    signOut: notMountedFunction,
});

export function useAuthContext(): AuthContextType {
    return React.useContext(AuthContext);
}
