import React, { useEffect } from 'react';
import {Input} from 'antd';

import {useFetchJSON} from '@/hooks/useRequest';
import {uploadFile} from '@/services/files';


type FileUploadProps = {
    onUpload: (image: string) => void;
    onError: (error: string) => void;
    caption: string;
} & Omit<React.ComponentProps<typeof Input>, 'onChange' | 'type' | 'onError'>;

const FileUpload: React.FC<FileUploadProps> = ({
    onUpload,
    onError,
    caption,

    className,
    ...props
}) => {
    const {
        request,
        success,
        data,
        loading,
        error,
        reset,
    } = useFetchJSON(uploadFile);

    useEffect(() => {
        if (!loading && success) {
            onUpload(data?.fileName as string);
            reset();
        }
    }, [success, loading, data, onUpload, reset]);

    useEffect(() => {
        if (!loading && error) {
            onError(error);
            reset();
        }
    }, [error,loading, onError, reset]);

    return (
        <Input
            {...props}

            addonAfter={caption}
            type={'file'}
            onChange={({currentTarget: {files}}) => files && files[0] && request(files[0])}
            className={className}
        />
    );
};

export default FileUpload;
