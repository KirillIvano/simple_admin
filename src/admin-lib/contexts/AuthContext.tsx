import {createContext} from 'react';


export type AuthContextType = {
    isAuthorized: boolean;

}

const DEFAULT_AUTH_CONTEXT: AuthContextType = {
    isAuthorized: false,
};

export const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);
