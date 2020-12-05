import React, {useEffect} from 'react';
import {Route, RouteProps, useHistory} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {useUserContext} from '@/store/ports/user';
import {useMessages} from '@/hooks/useMessages';
import {getLoginPagePath} from '@/pages/Login/routes';


export type AuthenticatedRouteProps = RouteProps;

const AuthenticatedRoute = observer((props: RouteProps) => {
    const {isAuthenticated} = useUserContext();
    const messages = useMessages();
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated) {
            messages.error('Вы не авторизованы');
            history.push(getLoginPagePath());
        }
    }, [messages, history, isAuthenticated]);

    return <Route {...props} />;
});


export default AuthenticatedRoute;
