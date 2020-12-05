import React from 'react';
import {Grid} from 'react-flexbox-grid';

import styles from './styles.scss';
import {Burger} from './components';


const Header = () => (
    <header className={styles.header}>
        <Grid className={styles.headerContent}>
            <Burger />
        </Grid>
    </header>
);

export default Header;
