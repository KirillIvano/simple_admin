import React, {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Typography, Space} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {DataTable} from '@/uikit';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {useMessages} from '@/hooks/useMessages';

import {getProductsCategoryShowPath} from '../routes';


const CATEGORY_FIELDS = [
    {name: 'Идентификатор', field: 'id'},
    {name: 'Имя', field: 'name'},
];

const ProductCategory = () => {
    const {error, data} = useAdminData<{categories: Array<{id: number}>}>(
        getApiRequestUrl('/products/categories'),
    );

    const history = useHistory();
    const messages = useMessages();

    const rowSelectHandler = useCallback(
        (id: number) => history.push(getProductsCategoryShowPath(id)),
        [history],
    );

    useEffect(
        () => {
            error && messages.error(error);
        },
        [messages, error],
    );

    if (error) return <p>{error}</p>;
    if (!data) return <Preloader />;

    return (
        <p>
            <Typography.Title level={1}>Категории продуктов</Typography.Title>

            <Space direction="vertical">
                <Button
                    type="primary"
                    onClick={() => history.push('/categories/create')}
                >
                    {'Добавить'}
                </Button>

                <DataTable
                    fields={CATEGORY_FIELDS}
                    handleRowSelect={rowSelectHandler}
                    dataList={data.categories}
                />
            </Space>
        </p>
    );
};

export default ProductCategory;
