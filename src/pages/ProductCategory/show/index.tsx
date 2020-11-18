import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Space, Typography} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader, DeleteBtn} from '@/components';
import {DescriptionTable} from '@/uikit';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getImageUrl} from '@/util/getImageUrl';


const CategoryShow = () => {
    const history = useHistory();

    const {categoryId} = useParams<{categoryId: string}>();
    const {loading, error, data} = useAdminData<{name: string; image: string; id: number}>(
        getApiRequestUrl(`/products/categories/${categoryId}`),
    );

    if (loading) return <Preloader />;
    if (error || !data) return <p>{error}</p>;

    return (
        <>
            <Typography.Title level={3}>
                {`Категория "${data.name}"`}
            </Typography.Title>

            <Space direction="horizontal">
                <Button
                    type="primary"
                    onClick={() => history.push(`/categories/${data.id}/edit`)}
                >
                    {'Редактировать'}
                </Button>

                <DeleteBtn
                    url={getApiRequestUrl(`/products/categories/${categoryId}`)}
                    confirmationMessage={'Вы точно хотите удалить категорию?'}

                    handleSuccess={() => history.push('/categories')}
                >
                    {'Удалить'}
                </DeleteBtn>
            </Space>

            <DescriptionTable>
                <DescriptionTable.Item
                    name={'Идентификатор'}
                    value={data.id}
                />
                <DescriptionTable.Item
                    name={'Имя'}
                    value={data.name}
                />
                <DescriptionTable.Item
                    name={'Картинка'}
                    value={<img height={120} src={getImageUrl(data.image)} />}
                />
            </DescriptionTable>
        </>
    );
};

export default CategoryShow;
