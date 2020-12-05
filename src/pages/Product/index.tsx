import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ProductCreate from './create';
import ProductEdit from './edit';
import ProductShow from './show';

const ProductPages = () => (
    <Switch>
        <Route exact path={'/products/create'} component={ProductCreate} />
        <Route exact path={'/products/:productId/show'} component={ProductShow} />
        <Route exact path={'/products/:productId/edit'} component={ProductEdit} />
    </Switch>
);


export default ProductPages;
