import React from 'react';

import styles from './styles.scss';


type ErrorMessageProps = {
    children?: string;
}

const ErrorMessage = ({children}: ErrorMessageProps) => (
    <p className={styles.errorMessage}>
        {children}
    </p>
);

export default ErrorMessage;
