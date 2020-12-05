import React from 'react';
import {CloseCircleOutlined} from '@ant-design/icons';
import classnames from 'classnames';

import {useUIStore} from '@/store/ports/ui';

import styles from './styles.scss';
import { observer } from 'mobx-react-lite';


type CloseIconProps = {
    className?: string;
}

const CloseIcon = observer(({
    className,
}: CloseIconProps) => {
    const {closeNav} = useUIStore();

    return (
        <button
            className={classnames(
                className,
                styles.iconWrapper,
            )}
            onClick={closeNav}
        >
            <CloseCircleOutlined />
        </button>
    );
});

export default CloseIcon;
