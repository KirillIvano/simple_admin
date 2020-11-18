import React, {useCallback} from 'react';
import {Redirect, useHistory, useParams} from 'react-router-dom';
import {Button, Typography} from 'antd';

import {AdminForm, AdminInput} from '@/admin-lib/components';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {Space} from '@/uikit';


const EditProduct = () => {
    const history = useHistory();
    const {categoryId} = useParams<{categoryId: string}>();

    const handleSuccess = useCallback(() => history.push('/categories'), [history]);

    const {loading, error, data} = useAdminData<{name: string}>(
        getApiRequestUrl(`/products/categories/${categoryId}`),
    );

    if (loading) return <Preloader />;
    if (error) return <p>{error}</p>;
    if (!data) return <Redirect to={'/categories'} />;

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
