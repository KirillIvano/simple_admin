import {createContext, useContext} from 'react';

import {userStore} from './../stores/user';


export interface IUserStore {
    isAuthenticated: boolean;
    isUserInitialized: boolean;

    init: () => void;
}

export const UserContext = createContext<IUserStore>(userStore);
export const useUserContext = () => useContext(UserContext);
