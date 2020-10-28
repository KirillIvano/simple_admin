import React from 'react';
import {Grid as ReactGrid} from 'antd';

import styles from './styles.scss';


type GridProps = {
    children: React.ReactNode;
}

const Grid = ({}) => {
    const display = ReactGrid.useBreakpoint();
    console.log(display);

    return (
        <div>

        </div>
    );
};

export default Grid;
