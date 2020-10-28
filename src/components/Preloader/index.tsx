import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type PreloaderProps = {
    className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({
    className,
}) => (
    <div className={classnames(styles.preloaderContainer, className)}>
        <div className={styles.preloader}></div>
    </div>
);

export default Preloader;
