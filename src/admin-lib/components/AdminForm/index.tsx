import React from 'react';
import {useHistory} from 'react-router-dom';
import classnames from 'classnames';

import {request} from '@/util/request';
import {DataType} from '@/admin-lib/util/dataType';
import {formDataToJson} from '@/admin-lib/util/formDataToJson';

import {filterRequestParams} from './helpers/filterRequestParams';


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

    requestParams?: Omit<RequestInit, 'body' | 'method' | 'headers'>
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
}: AdminFormProps) => {
    const history = useHistory();

    const getHeaders = () => dataType === 'json' ? {'Content-Type': 'application/json'} : undefined;

    const prepareBodyForSending = (body: FormData): string | FormData => {
        const enhancedBody = enhanceDataBeforeSend ? enhanceDataBeforeSend(body) : body;
        const jsonBody = dataType === 'json' ? formDataToJson(enhancedBody) : enhancedBody;

        return jsonBody;
    };

    const performRequest = async (data: FormData) => {
        const body = prepareBodyForSending(data);
        const headers = getHeaders();

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

        const body = new FormData(e.currentTarget);
        handleData && handleData(body);

        performRequest(body);
    };

    return (
        <form
            className={classnames(className)}
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    );
};

export default AdminForm;
