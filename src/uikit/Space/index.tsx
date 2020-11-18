import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type SpaceProps = {
    className?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    direction?: 'vertical' | 'horizontal';
}

const Space = ({
    className,
    size = 'md',
    direction = 'vertical',
}: SpaceProps) => (
    <div
        className={classnames(
            className,
            styles[direction],
            styles[size],
        )}
        aria-hidden="true"
    />
);

export default Space;
