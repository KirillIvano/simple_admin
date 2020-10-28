import {createContext} from 'react';

import {ProductsStore} from '@/store/stores/products';

import {ProductsStoreInterface} from './types';


export const ProductsContext = createContext<ProductsStoreInterface>(new ProductsStore());
