import {useEffect, useState} from 'react';

import {useRequestsContext} from './useRequestsContext';


export type UseDataRes<TData> = {
    error: string;
    loading: boolean;
    data: TData | null;
}

export const useAdminData = <TData extends Record<string, unknown | unknown[]>>(
    url: string,
    options?: RequestInit,
): UseDataRes<TData> => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<null | TData>(null);

    const {request} = useRequestsContext();

    useEffect(() => {
        const performRequest = async () => {
            const res = await request<TData>(url, options);

            if (res.ok) {
                setData(res.data);
            } else {
                setError(res.error);
            }

            setLoading(false);
        };

        performRequest();
    }, [url, options, request]);


    return {error, loading, data};
};
