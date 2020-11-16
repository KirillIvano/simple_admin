import React, {ReactNode} from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


export type NavItemProps = {
    children: ReactNode;
    className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
    children,
    className,
}) => (
    <li className={classnames(
        styles.navItem,
        className,
    )}>
        {children}
    </li>
);

export default NavItem;
