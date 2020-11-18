import React from 'react';
import {Switch, Route} from 'react-router-dom';

import CategoriesPage from './list';
import CategoryCreatePage from './create';
import CategoryShowPage from './show';
import CategoryEditPage from './edit';


const ProductCategory = () => (
    <Switch>
        <Route exact path="/categories" component={CategoriesPage} />
        <Route exact path="/categories/create" component={CategoryCreatePage} />
        <Route exact path="/categories/:categoryId/show" component={CategoryShowPage} />
        <Route exact path="/categories/:categoryId/edit" component={CategoryEditPage} />
    </Switch>
);

export default ProductCategory;
