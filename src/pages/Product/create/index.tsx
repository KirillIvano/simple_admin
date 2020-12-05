import React, {useCallback, useMemo} from 'react';
import {Button, Typography} from 'antd';
import {Redirect} from 'react-router-dom';

import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {AdminForm, AdminInput, AdminTextArea} from '@/admin-lib/components';
import {FormValidators} from '@/admin-lib/types/form';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {useQuery} from '@/hooks/useQuery';
import {Preloader} from '@/components';
import {ErrorMessage, Space} from '@/uikit';
import {ProductCategoryType} from '@/entities/products/types';
import {getProductsCategoryListPath} from '@/pages/ProductCategory/routes';
import {useMessages} from '@/hooks/useMessages';


const PRODUCT_CREATE_VALIDATORS: FormValidators = {
    name: {required: true},
    image: {required: true},
    certificate: {required: true},
    shortDescription: {required: true},
    price: {required: true},
};

const ProductCreate = () => {
    const {categoryId, redirectTo} = useQuery<{redirectTo: string, categoryId: string}>();
    const {data, error} = useAdminData<ProductCategoryType>(
        getApiRequestUrl(`/products/categories/${categoryId}`),
    );

    const messages = useMessages();
    const requestParams = useMemo(() => ({categoryId}), [categoryId]);

    const handleSuccess = useCallback(
        () => messages.success(''),
        [messages],
    );

    if (!categoryId) return <Redirect to={getProductsCategoryListPath()} />;

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <AdminForm
            action={getApiRequestUrl('/products', requestParams)}
            method="POST"
            dataType="multipart"
            redirectTo={redirectTo}

            onError={messages.error}
            onSuccess={handleSuccess}

            validators={PRODUCT_CREATE_VALIDATORS}
        >
            <Typography>Создание продукта для категории #{data.name}</Typography>

            <AdminInput
                labelText="Имя"
                name="name"
            />

            <AdminInput
                labelText="Картинка"
                name="image"
                type="file"
            />

            <AdminInput
                labelText="Сертификат"
                name="certificate"
                type="file"
            />

            <AdminInput
                labelText="Краткое описание"
                name="shortDescription"
            />

            <AdminTextArea
                labelText="Описание"
                name="description"
            />

            <AdminInput
                labelText="Цена"
                name="price"
            />

            <Space />

            <Button
                type="primary"
                htmlType="submit"
            >
                Подтвердить
            </Button>
        </AdminForm>
    );
};


export default ProductCreate;
