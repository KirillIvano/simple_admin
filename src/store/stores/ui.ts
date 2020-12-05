import {observable, action, makeObservable} from 'mobx';

import {UIStore as UIStoreInterface} from './../ports/ui';


export class UIStore implements UIStoreInterface {
    @observable
    isNavVisible = true;

    constructor() {
        makeObservable(this);
    }

    @action
    openNav = () => this.isNavVisible = true;

    @action
    closeNav = () => this.isNavVisible = false;
}

export const uiStore = new UIStore();
