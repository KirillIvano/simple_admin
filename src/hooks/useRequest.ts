import {useCallback, useState} from 'react';

import {ResponseType} from '@/util/request';


type FetchStateType<TData extends Record<string, unknown> | Array<unknown>> = {
    data?: TData,
    error: string | null,
    success: boolean,
    loading: boolean,
}

type UseFetchReturn<TData extends Record<string, unknown> | Array<unknown>, TParams extends Array<any>> = ({
    error: null;
    loading: false;
    data: TData;
    success: true
} | {
    error: null;
    loading: true;
    data: null;
    success: false
} | {
    error: string;
    loading: false;
    data: null;
    success: false
}) & {
    request: (...args: TParams) => void;
    reset: () => void;
}

const DEFAULT_FETCH_STATE: FetchStateType<any> = Object.freeze({
    data: null,
    error: null,
    success: false,
    loading: false,
});
const PREFETCH_STATE: FetchStateType<any> = {...DEFAULT_FETCH_STATE, loading: true};

export const useFetchJSON = <
        TData extends Record<string, unknown> | Array<unknown>,
        TParams extends Array<any>
    >(
        handler: (...params: TParams) => Promise<ResponseType<TData>>,
    ): UseFetchReturn<TData, TParams> => {
    const [state, setState] = useState<FetchStateType<TData>>(DEFAULT_FETCH_STATE);

    const reset = useCallback(() => setState(DEFAULT_FETCH_STATE), []);

    const request = useCallback(async (...params: TParams) => {
        setState(PREFETCH_STATE);

        const res = await handler(...params);

        if (res.ok) {
            setState({
                data: res.data,
                loading: false,
                error: null,
                success: true,
            });
        } else {
            setState({
                loading: false,
                error: res.error,
                success: false,
            });
        }
    }, [handler]);

    return {
        ...state,
        reset,
        request,
    } as UseFetchReturn<TData, TParams>;
};
