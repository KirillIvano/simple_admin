import {isEmpty} from 'ramda';

import {ErrorRecord} from '@/admin-lib/util/errorRecord';


export type Validator<TVal,> = {value: TVal; message?: string} | TVal;

export type RequiredValidator =  Validator<boolean>;
export type PatternValidator = Validator<RegExp>;
export type ValidateValidator = Validator<(value: string) => boolean>;

export type Validators<TBody extends Record<string, string | Blob> = Record<string, string | Blob>> = Record<
    keyof TBody,
    {
        required?: RequiredValidator,
        pattern?: PatternValidator,
        validate?: ValidateValidator;
    }
>;


const DEFAULT_MESSAGES = {
    REQUIRED: 'Поле обязательно',
    PATTERN: 'Поле не соответствует формату',
    VALIDATE: 'Неправильное значение',
};


export const getRequiredError = (
    value: string | File,
    required: RequiredValidator,
): string | null => {
    if (typeof required === 'boolean') {
        if (required && !value) return DEFAULT_MESSAGES.REQUIRED;
    } else {
        if (required.value && !value) return required.message || DEFAULT_MESSAGES.REQUIRED;
    }

    return null;
};

export const getPatternError = (
    value: string,
    pattern: PatternValidator,
): string | null => {
    if (pattern instanceof RegExp) {
        if (!pattern.test(value)) {
            return DEFAULT_MESSAGES.PATTERN;
        }
    } else {
        if (!pattern.value.test(value)) {
            return pattern.message || DEFAULT_MESSAGES.PATTERN;
        }
    }

    return null;
};

export const getValidationError = (
    value: string,
    validate: ValidateValidator,
): string | null => {
    if (typeof validate === 'function') {
        if (!validate(value)) return DEFAULT_MESSAGES.VALIDATE;
    } else {
        if (!validate.value(value)) {
            return validate.message || DEFAULT_MESSAGES.VALIDATE;
        }
    }

    return null;
};


export const getFormErrors = <TBody extends Record<string, string | File>>(
    data: FormData,
    validators: Validators<TBody>,
): (Record<string, string[]> | null) => {
    const errors = new ErrorRecord();

    for (const [key, value] of data.entries()) {
        const validator = validators[key];

        if (validator) {
            const {required, pattern, validate} = validator;

            if (required !== undefined) {
                const requiredErr = getRequiredError(value, required);
                if (requiredErr) errors.addMessage(key, requiredErr);
            }

            if (typeof value === 'string') {
                if (pattern !== undefined) {
                    const patternErr = getPatternError(value, pattern);
                    if (patternErr) errors.addMessage(key, patternErr);
                }

                if (validate !== undefined) {
                    const validationErr = getValidationError(value, validate);
                    if (validationErr) errors.addMessage(key, validationErr);
                }
            }
        }
    }

    return isEmpty(errors.messages) ? null : errors.messages;
};
