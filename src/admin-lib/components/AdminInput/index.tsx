import React from 'react';
import {Input} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import classnames from 'classnames';

import {useUniqueId} from '@/admin-lib/hooks/useUniqueId';
import {useValidationErrors} from '@/admin-lib/hooks/useValidationErrors';
import {useFieldValidators} from '@/admin-lib/hooks/useFieldValidators';

import styles from './styles.scss';


type InputErrorsProps = {
    errors?: string[];
}

const InputErrors = React.memo(({errors}: InputErrorsProps) => (
    <div>
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
));
InputErrors.displayName = 'InputErrors';


type BaseProps = {
    name: string;
    labelText: string;

    containerClass?: string;
}

export type InputProps = BaseProps & Omit<React.ComponentProps<typeof Input>, 'required' | 'pattern'>;

export const AdminInput = ({
    name,
    labelText,

    containerClass,
    className,

    ...inputProps
}: InputProps) => {
    const errors = useValidationErrors(name);
    const validators = useFieldValidators(name);

    const id = useUniqueId();

    return (
        <div className={classnames(styles.inputContainer, containerClass)}>
            <label
                className={styles.inputLabel}
                htmlFor={id}
            >
                {labelText}
                {validators?.required && <span className={styles.asteriks}>*</span>}
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

            <InputErrors errors={errors} />
        </div>
    );
};


export type AdminTextAreaProps = BaseProps & Omit<React.ComponentProps<typeof TextArea>, 'required' | 'pattern'>;

export const AdminTextArea = ({
    name,
    labelText,

    containerClass,
    className,

    ...props
}: AdminTextAreaProps) => {
    const errors = useValidationErrors(name);
    const validators = useFieldValidators(name);

    const id = useUniqueId();

    return (
        <div className={classnames(styles.inputContainer, containerClass)}>
            <label
                className={styles.inputLabel}
                htmlFor={id}
            >
                {labelText}
                {validators?.required && <span className={styles.asteriks}>*</span>}
            </label>

            <Input.TextArea
                {...props}
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

            <InputErrors errors={errors} />
        </div>
    );
};
