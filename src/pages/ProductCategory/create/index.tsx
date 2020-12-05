import React, {useCallback} from 'react';
import {Typography, Button} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {FormValidators} from '@/admin-lib/types/form';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {Space} from '@/uikit';
import {useMessages} from '@/hooks/useMessages';

import {getProductsCategoryListPath} from '../routes';


const CATEGORY_FORM_VALIDATORS: FormValidators = {
    name: {
        required: true,
    },
    image: {
        required: true,
    },
};

const ProductCategoryCreate = () => {
    const messages = useMessages();

    const handleSuccess = useCallback(
        () => messages.success('Категория успешно создана'),
        [messages],
    );

    return (
        <AdminForm
            action={getApiRequestUrl('/products/categories')}
            method="POST"
            dataType="multipart"
            redirectTo={getProductsCategoryListPath()}
            validators={CATEGORY_FORM_VALIDATORS}
            onError={messages.error}
            onSuccess={handleSuccess}
        >
            <Typography>Создание категории продуктов</Typography>

            <AdminInput
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
                {'Создать категорию'}
            </Button>
        </AdminForm>
    );
};

export default ProductCategoryCreate;
