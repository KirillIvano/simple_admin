import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


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

        </nav>
    </div>
);

export default Navigation;
