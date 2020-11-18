import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Typography, Space} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader} from '@/components';
import {DataTable} from '@/uikit';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';


const CATEGORY_FIELDS = [
    {name: 'Идентификатор', field: 'id'},
    {name: 'Имя', field: 'name'},
];

const ProductCategory = () => {
    const {loading, error, data} = useAdminData<{categories: Array<{id: number}>}>(
        getApiRequestUrl('/products/categories'),
    );

    const history = useHistory();
    const rowSelectHandler = useCallback(
        (id: number) => history.push(`/categories/${id}/show`),
        [history],
    );


    if (loading || !data) return <Preloader />;
    if (error) return <p>{error}</p>;

    return (
        <>
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
        </>
    );
};

export default ProductCategory;
