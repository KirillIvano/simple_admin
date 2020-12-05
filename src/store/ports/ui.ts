import {createContext, useContext} from 'react';

import {uiStore} from './../stores/ui';


export interface UIStore {
    isNavVisible: boolean;
    openNav: () => void;
    closeNav: () => void;
}

export const UIStoreContext = createContext<UIStore>(uiStore);
export const useUIStore = () => useContext(UIStoreContext);
