import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {useUIStore} from '@/store/ports/ui';

import styles from './styles.scss';
import {CloseIcon, NavItem} from './components';


const Navigation = observer(() => {
    const {isNavVisible} = useUIStore();

    return (
        <div className={classnames(
            styles.navContainer,
            {[styles.opened]: isNavVisible},
        )}>
            <nav className={styles.nav}>
                <CloseIcon className={styles.closeIcon} />

                <NavItem>
                    <Link to="/categories">Категории продуктов</Link>
                </NavItem>
            </nav>
        </div>
    );
});

export default Navigation;
