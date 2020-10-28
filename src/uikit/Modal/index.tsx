import React from 'react';
import {Dialog, DialogProps} from '@material-ui/core';
import classnames from 'classnames';

import styles from './styles.scss';


type ModalProps = {
    handleClose?: () => void;
    closable?: boolean;
} & DialogProps;

const Modal: React.FC<ModalProps> = ({
    className,
    closable=true,
    handleClose,

    ...props
}) => (
    <Dialog
        className={classnames(className, styles.modalContent)}
        onClose={handleClose}
        disableEscapeKeyDown={!closable}
        disableBackdropClick={!closable}

        {...props}
    />
);

export default Modal;
