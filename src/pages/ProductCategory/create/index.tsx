import React from 'react';
import {Typography, Button} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {Validators} from '@/admin-lib/types/form';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';


const CATEGORY_FORM_VALIDATORS: Validators = {
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

        <Button
            type="primary"
            htmlType="submit"
        >
            {'Создать продукт'}
        </Button>
    </AdminForm>
);


export default ProductCategoryCreate;
