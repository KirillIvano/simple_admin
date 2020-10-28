import {request, ResponseType} from '@/util/request';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';


export const uploadFile = (file: File): Promise<ResponseType<{fileName: string}>> => {
    const formData = new FormData();

    formData.append('file', file);

    return request<{fileName: string}>(
        getApiRequestUrl('/files/'),
        {
            body: formData,
            method: 'POST',
        },
    );
};

