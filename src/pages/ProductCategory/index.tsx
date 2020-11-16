import React from 'react';
import {Switch, Route} from 'react-router-dom';

import CategoryCreatePage from './create';


const ProductCategory = () => (
    <Switch>
        <Route exact path="/categories/create" component={CategoryCreatePage} />
    </Switch>
);

export default ProductCategory;
