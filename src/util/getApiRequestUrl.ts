import {
    stringify as stringifyQs,
    StringifiableRecord,
} from 'query-string';

import {SERVER_ORIGIN} from '@/settings';


export const getApiRequestUrl = (path: string, params: StringifiableRecord={}): string =>
    `${SERVER_ORIGIN}${path}?${stringifyQs(params)}`;
