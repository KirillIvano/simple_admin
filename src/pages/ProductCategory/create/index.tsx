import React from 'react';
import {Typography, Button} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {FormValidators} from '@/admin-lib/types/form';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {Space} from '@/uikit';


const CATEGORY_FORM_VALIDATORS: FormValidators = {
    name: {
        required: true,
    },
    image: {
        required: true,
    },
};

const ProductCategoryCreate = () => (
    <AdminForm
        action={getApiRequestUrl('/products/categories')}
        method="POST"
        dataType="multipart"
        redirectTo="/categories"
        validators={CATEGORY_FORM_VALIDATORS}
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
            {'Создать продукт'}
        </Button>
    </AdminForm>
);


export default ProductCategoryCreate;
