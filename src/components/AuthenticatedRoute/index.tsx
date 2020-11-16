import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {useUserContext} from '@/store/ports/user';


export type AuthenticatedRouteProps = RouteProps;

const AuthenticatedRoute = observer((props: RouteProps) => {
    const {isAuthenticated} = useUserContext();

    if (!isAuthenticated) return <Redirect to="/login" />;

    return <Route {...props} />;
});


export default AuthenticatedRoute;
