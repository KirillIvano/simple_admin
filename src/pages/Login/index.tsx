import React, {useEffect, useState} from 'react';
import {Button, Input, Space} from 'antd';
import {Redirect, useHistory} from 'react-router-dom';
import {observer, useLocalStore} from 'mobx-react-lite';

import {useUserContext} from '@/store/ports/user';
import {useMessages} from '@/hooks/useMessages';

import {LoginPageStore} from './localStore';


const LoginPage = observer(() => {
    const [password, setPassword] = useState('');
    const userStore = useUserContext();

    const history = useHistory();
    const messages = useMessages();

    const {loginInProgress, loginSucceed, loginError, login} = useLocalStore(() => new LoginPageStore());

    useEffect(() => {
        loginSucceed && history.push('/contacts');
    }, [loginSucceed, history]);

    useEffect(() => {
        loginError && messages.error(loginError);
    }, [loginError, messages]);

    if (!loginSucceed && userStore.isAuthenticated) {
        return <Redirect to="/contacts" />;
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                login(password);
            }}
        >
            <Space direction="vertical">
                <p>Введите пароль:</p>

                <Input
                    disabled={loginInProgress}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="text"
                />

                <Button
                    disabled={loginInProgress}
                    htmlType="submit"
                >
                    Подтвердить
                </Button>
            </Space>
        </form>
    );
});

export default LoginPage;
