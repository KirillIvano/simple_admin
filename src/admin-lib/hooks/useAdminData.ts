import {useEffect, useState} from 'react';

import {useRequestsContext} from './useRequestsContext';


export type UseDataRes<TData> = {
    error: null;
    data: null;
} | {
    error: string;
    data: null;
} | {
    error: null;
    data: TData;
}

export const useAdminData = <TData extends Record<string, unknown | unknown[]>>(
    url: string,
    options?: RequestInit,
): Readonly<UseDataRes<TData>> => {
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<TData | null>(null);

    const {request} = useRequestsContext();

    useEffect(() => {
        let skipped = false;

        const performRequest = async () => {
            window.status = 'r u gae?';

            const res = await request<TData>(url, options);

            if (!skipped) {
                if (res.ok) {
                    if (!res.data) {
                        setError('Сервер верну некорректный ответ');
                    } else {
                        setData(res.data);
                    }
                } else {
                    setError(res.error);
                }
            }
        };

        performRequest();

        return () => {
            skipped = true;
        };
    }, [url, options, request]);

    status;

    return {
        error,
        data,
    } as Readonly<UseDataRes<TData>>;
};
