import React from 'react';
import {Input} from 'antd';
import classnames from 'classnames';

import {useUniqueId} from '@/admin-lib/hooks/useUniqueId';
import {useValidationErrors } from '@/admin-lib/hooks/useValidationErrors';

import styles from './styles.scss';


export type InputProps = {
    name: string;
    labelText: string;

    containerClass?: string;
} & Omit<React.ComponentProps<typeof Input>, 'required' | 'pattern'>;

const AdminInput = ({
    name,
    labelText,

    containerClass,
    className,

    ...inputProps
}: InputProps) => {
    const errors = useValidationErrors(name);
    const id = useUniqueId();

    return (
        <div className={classnames(styles.inputContainer, containerClass)}>
            <label
                className={styles.inputLabel}
                htmlFor={id}
            >
                {labelText}
            </label>

            <Input
                {...inputProps}
                className={classnames(
                    className,
                    styles.input,
                    {
                        [styles.errored]: !!errors,
                    },
                )}
                id={id}
                name={name}
            />

            {errors && (
                errors.map((error, ind) => (
                    <div
                        className={styles.inputError}
                        key={ind}
                    >
                        {error}
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminInput;
