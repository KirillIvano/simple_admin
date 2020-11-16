import {computed, makeObservable, observable} from 'mobx';

import {IUserStore} from './../ports/user';


class UserStore implements IUserStore {
    private static PASSWORD_KEY = 'pwd';

    @observable
    private _password: string | null = null;
    @observable
    private _isAuthenticated = false;
    @observable
    isUserInitialized = false;


    constructor() {
        makeObservable(this);
    }

    @computed
    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    init() {
        this._password = this.getPasswordFromMemory();

        if (this._password) {
            this.setAuthenticated();
        }

        this.isUserInitialized = true;
    }


    setPassword = (pwd: string) => {
        this._password = pwd;
        this.savePassword(pwd);
    }

    getPassword = () => this._password;


    setAuthenticated = () => {
        this._isAuthenticated = true;
    }

    setUnauthenticated = () => {
        this._isAuthenticated = false;
    }


    private savePassword(pwd: string) {
        localStorage.setItem(UserStore.PASSWORD_KEY, pwd);
    }

    private getPasswordFromMemory(): string | null {
        return localStorage.getItem(UserStore.PASSWORD_KEY);
    }
}


export const userStore = new UserStore();
