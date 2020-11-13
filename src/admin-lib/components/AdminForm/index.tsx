import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import classnames from 'classnames';

import {request} from '@/util/request';
import {DataType} from '@/admin-lib/util/dataType';
import {formDataToJson} from '@/admin-lib/util/formDataToJson';
import {WithFormContext} from '@/admin-lib/contexts/FormContext';
import {useFormErrors} from '@/admin-lib/hooks/useFormErrors';
import {Validators} from '@/admin-lib/types/form';

import {filterRequestParams} from './helpers/filterRequestParams';
import {getHeadersFromDataType} from './helpers/getHeadersFromDataType';
import {getFormErrors} from './helpers/getFormErrors';
import {getFormDataFromForm} from './helpers/getFormDataFromForm';


type AdminFormProps = {
    action: string;
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    dataType: DataType;
    children: React.ReactNode;

    redirectTo?: string;
    className?: string;
    authRequired?: boolean;

    handleSuccess?: () => void;
    handleError?: (error: string) => void;
    handleData?: (data: FormData) => void;
    enhanceDataBeforeSend?: (data: FormData) => FormData;

    requestParams?: Omit<RequestInit, 'body' | 'method' | 'headers'>;
    validators?: Validators;
}

const AdminForm = ({
    action,
    method,
    children,
    dataType,

    redirectTo,
    className,

    handleSuccess,
    handleError,
    handleData,
    enhanceDataBeforeSend,

    requestParams={},
    validators,
}: AdminFormProps) => {
    const history = useHistory();
    const {errors, setErrors, clearErrors} = useFormErrors();
    const [isFormDisabled, setFormDisabled] = useState(false);

    const prepareBodyForSending = (body: FormData): string | FormData => {
        const enhancedBody = enhanceDataBeforeSend ? enhanceDataBeforeSend(body) : body;
        const jsonBody = dataType === 'json' ? formDataToJson(enhancedBody) : enhancedBody;

        return jsonBody;
    };

    const performRequest = async (data: FormData) => {
        const body = prepareBodyForSending(data);
        const headers = getHeadersFromDataType(dataType);

        const filteredParams = filterRequestParams(requestParams);

        const res = await request(
            action,
            {
                method,
                headers,
                body,

                ...filteredParams,
            },
        );

        setFormDisabled(false);

        if (!res.ok) {
            handleError && handleError(res.error);
        } else {
            if (handleSuccess) {
                handleSuccess();
            } else if (redirectTo) {
                history.replace(redirectTo);
            } else {
                // eslint-disable-next-line no-console
                console.error('Должен быть предоставлен handleSuccess или redirectTo');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = getFormDataFromForm(e.currentTarget);
        handleData && handleData(body);

        const errors = validators ? getFormErrors(body, validators) : null;

        if (errors && Object.keys(errors).length) {
            setErrors(errors);
        } else {
            clearErrors();
            setFormDisabled(true);
            performRequest(body);
        }
    };

    return (
        <form
            className={classnames(className)}
            onSubmit={handleSubmit}
        >
            <WithFormContext
                errors={errors}
                isFormDisabled={isFormDisabled}
                isSubmitFailed={false}
            >
                {children}
            </WithFormContext>
        </form>
    );
};


export default React.memo(AdminForm);
