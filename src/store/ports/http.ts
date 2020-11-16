import {createContext, useContext} from 'react';

import {httpStore} from './../stores/http';


export const HttpContext = createContext(httpStore);
export const useHttpContext = () => useContext(HttpContext);
