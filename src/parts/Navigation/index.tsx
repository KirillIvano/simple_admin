import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './styles.scss';
import {NavItem} from './components';


type NavigationProps = {
    isOpen: boolean;
};

const Navigation: React.FC<NavigationProps> = ({
    isOpen,
}) => (
    <div className={classnames(
        styles.navContainer,
        {[styles.opened]: isOpen},
    )}>
        <nav className={styles.nav}>
            <NavItem>
                <Link to="/categories">Категории продуктов</Link>
            </NavItem>
        </nav>
    </div>
);

export default Navigation;
