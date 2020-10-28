import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


export type BlurredImageProps = {
    src: string;

    className?: string;
};

const BlurredImage: React.FC<BlurredImageProps> = ({
    className,
    src,
}) => (
    <div className={classnames(className, styles.blurredImageWrapper)}>
        <img
            className={styles.backgroundImage}
            src={src}
            alt=""
        />
        <img
            className={styles.frontImage}
            src={src}
            alt=""
        />
    </div>
);

export default BlurredImage;
