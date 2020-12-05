import React from 'react';
import {observer} from 'mobx-react-lite';
import classnames from 'classnames';

import {useUIStore} from '@/store/ports/ui';

import styles from './styles.scss';


type BurgerProps = {
    size?: number;
    className?: string;
}

const Burger = observer(({
    size,
    className,
}: BurgerProps) => {
    const {openNav, closeNav, isNavVisible} = useUIStore();

    const toggleNav = () => isNavVisible ? closeNav() : openNav();

    return (
        <button
            className={classnames(styles.burgerContainer, className)}

            onClick={toggleNav}
        >
            <div
                style={size ? {width: `${size}px`} : undefined}
                className={styles.burger}
            />
        </button>
    );
});

export default Burger;
