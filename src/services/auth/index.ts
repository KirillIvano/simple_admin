import { getApiRequestUrl } from '@/util/getApiRequestUrl';
import {request, ResponseType} from '@/util/request';


export const login = (password: string): Promise<ResponseType<{valid: boolean}>> =>
    request(getApiRequestUrl('/auth/adminLogin', {password}));
