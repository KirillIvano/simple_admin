import React, {useEffect} from 'react';

import {Table, Divider, Space} from 'antd';

import {useFetchJSON} from '@/hooks/useRequest';
import {getCategoriesPreviews} from '@/services/products';
import {Preloader} from '@/components';

import {CreateBtn} from './components';


const columns = [
    {
        title: 'Идентификатор',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Имя категории',
        dataIndex: 'name',
        key: 'name',
    },
];

const ProductCategoriesPage = () => {
    const {
        data,
        loading,
        error,
        request,
    } = useFetchJSON(getCategoriesPreviews);

    useEffect(() => {
        request();
    }, [request]);

    if (loading) return <Preloader />;
    if (error) return <p>{error}</p>;
    if (!data) return <p>Ничего не найдено:(</p>;

    return (
        <div>
            <Space>
                <CreateBtn />
            </Space>

            <Divider />

            <Table
                pagination={{pageSize: 4}}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default ProductCategoriesPage;
