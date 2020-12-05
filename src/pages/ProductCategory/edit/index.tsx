import React, {useCallback, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Typography} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {ErrorMessage, Space} from '@/uikit';
import {useMessages} from '@/hooks/useMessages';

import {getProductsCategoryListPath} from '../routes';


const EditProduct = () => {
    const history = useHistory();
    const messages = useMessages();
    const {categoryId} = useParams<{categoryId: string}>();

    const {error, data} = useAdminData<{name: string}>(
        getApiRequestUrl(`/products/categories/${categoryId}`),
    );

    const handleSuccess = useCallback(
        () => {
            messages.success('Категория успешно отредактирована');
            history.push(getProductsCategoryListPath());
        },
        [messages, history],
    );

    useEffect(() => {
        error && messages.error(error);
    }, [error, messages]);

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <AdminForm
            action={getApiRequestUrl(`/products/categories/${categoryId}`)}
            method="PUT"
            dataType="multipart"

            onSuccess={handleSuccess}
        >
            <Typography>Редактирование категории продуктов</Typography>

            <AdminInput
                defaultValue={data.name}
                labelText="Имя"
                type="text"
                name="name"
            />

            <AdminInput
                labelText="Картинка"
                type="file"
                name="image"
            />

            <Space />

            <Button
                type="primary"
                htmlType="submit"
            >
                {'Сохранить'}
            </Button>
        </AdminForm>
    );
};

export default EditProduct;
