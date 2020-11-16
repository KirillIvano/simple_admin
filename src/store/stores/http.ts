import {observable, action, makeObservable} from 'mobx';

import {RequestProvider, ResponseType} from '@/admin-lib/types/requests';
import {request} from '@/util/request';

import {userStore} from './user';


interface IUserStore {
    isAuthenticated: boolean;

    setPassword: (password: string) => void;
    getPassword: () => string | null;
    setAuthenticated: () => void;
    setUnauthenticated: () => void;
}

const getDefaultUnauthenticatedError = <TData extends Record<string, unknown>,>(): ResponseType<TData> =>
    ({ok: false, error: 'Вы не авторизованы'});

class HttpStoreBase implements RequestProvider {
    constructor(
        private _userStore: IUserStore,
    ) {
        makeObservable(this);
    }

    @observable
    counter = 0;

    @action
    logout = () => {
        this._userStore.setUnauthenticated();
    }

    @action
    request = async <TRes extends Record<string, unknown | unknown[]>>(
        url: string,
        options: RequestInit = {},
    ): Promise<ResponseType<TRes>> => {
        const headers = options.headers || {};

        if (!this._userStore.isAuthenticated) {
            return getDefaultUnauthenticatedError();
        }

        const res = await request<TRes>(
            url,
            {
                ...options,
                headers: {
                    ...headers,
                    'Authorization': `Password ${this._userStore.getPassword()}`,
                },
            },
        );

        if (!res.ok) {
            if (res.status === 403) {
                this.logout();
            }
        }

        return res;
    }
}

const HttpStore = HttpStoreBase.bind(null, userStore);


export const httpStore = new HttpStore();
