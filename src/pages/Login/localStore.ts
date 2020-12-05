import {action, makeObservable, observable} from 'mobx';

import {login} from '@/services/auth';
import {userStore} from '@/store/stores/user';

interface IUserStore {
    setPassword: (pwd: string) => void;
    setAuthenticated: () => void;
}

class LoginPageStoreBase {
    @observable
    loginInProgress = false;

    @observable
    loginError: string | null = null;

    @observable
    loginSucceed = false;

    constructor(
        private _userStore: IUserStore,
    ) {
        makeObservable(this);
    }

    @action
    login = async (password: string) => {
        this.reset();

        const res = await login(password);

        if (res.ok) {
            if (res.data.valid) {
                this.loginSucceed = true;
                this._userStore.setPassword(password);
                this._userStore.setAuthenticated();
            } else {
                this.loginError = 'Неверный пароль';
            }
        } else {
            this.loginError = res.error;
        }

        this.loginInProgress = false;
    }

    private reset(): void {
        this.loginError = null;
        this.loginInProgress = true;
        this.loginSucceed = false;
    }
}

export const LoginPageStore = LoginPageStoreBase.bind(null, userStore);
