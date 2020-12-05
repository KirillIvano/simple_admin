import {useEffect, useState} from 'react';

import {useRequestsContext} from './useRequestsContext';


export enum RequestStatus {
    SKIPPED='skipped',
    LOADING='loading',
    ERROR='error',
    SUCCESS='success',
}

export type UseDataRes<TData> = {
    status: RequestStatus.LOADING;
    error: null;
    data: null;
} | {
    status: RequestStatus.ERROR;
    error: string;
    data: null;
} | {
    status: RequestStatus.SUCCESS;
    error: null;
    data: TData;
}


export const useAdminData = <TData extends Record<string, unknown | unknown[]>>(
    url: string,
    options?: RequestInit,
): Readonly<UseDataRes<TData>> => {
    const [error, setError] = useState<null | string>(null);
    const [status, setStatus] = useState<RequestStatus>(RequestStatus.LOADING);
    const [data, setData] = useState<TData | null>(null);

    const {request} = useRequestsContext();

    useEffect(() => {
        let skipped = false;

        const performRequest = async () => {
            const res = await request<TData>(url, options);

            if (!skipped) {
                if (res.ok) {
                    setData(res.data);
                    setStatus(RequestStatus.SUCCESS);
                } else {
                    setError(res.error);
                    setStatus(RequestStatus.ERROR);
                }
            }
        };

        performRequest();

        return () => {
            skipped = true;
        };
    }, [url, options, request]);

    return {
        error,
        status,
        data,
    } as Readonly<UseDataRes<TData>>;
};
