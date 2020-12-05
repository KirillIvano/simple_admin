import React from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {Button, Typography, Space as SpaceContainer} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {Preloader, DeleteBtn} from '@/components';
import {DescriptionTable, ErrorMessage, Space} from '@/uikit';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getImageUrl} from '@/util/getImageUrl';
import {getProductCreatePath} from '@/pages/Product/routes';

import {CategoryProducts} from '../parts';
import {getProductsCategoryEditPath, getProductsCategoryListPath} from '../routes';


const CategoryShow = () => {
    const history = useHistory();
    const location = useLocation();

    const {categoryId} = useParams<{categoryId: string}>();
    const {error, data} = useAdminData<{name: string; image: string; id: number}>(
        getApiRequestUrl(`/products/categories/${categoryId}`),
    );

    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!data) return <Preloader />;

    return (
        <>
            <Typography.Title level={3}>
                {`Категория "${data.name}"`}
            </Typography.Title>

            <SpaceContainer direction="horizontal">
                <Button
                    type="primary"
                    onClick={() => history.push(getProductsCategoryEditPath(data.id))}
                >
                    {'Редактировать'}
                </Button>

                <Button
                    type="primary"
                    onClick={() => history.push(getProductCreatePath(data.id, location.pathname))}
                >
                    {'Добавить продукт'}
                </Button>

                <DeleteBtn
                    url={getApiRequestUrl(`/products/categories/${categoryId}`)}
                    confirmationMessage={'Вы точно хотите удалить категорию?'}

                    handleSuccess={() => history.push(getProductsCategoryListPath())}
                >
                    {'Удалить'}
                </DeleteBtn>
            </SpaceContainer>

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

            <Space />

            <Typography.Title level={3}>Продукты</Typography.Title>
            <CategoryProducts />
        </>
    );
};

export default CategoryShow;
