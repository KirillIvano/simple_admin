import React from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Typography, Space, Button} from 'antd';

import {useAdminData} from '@/admin-lib/hooks/useAdminData';
import {DeleteBtn, Preloader} from '@/components';
import {ProductType} from '@/entities/products/types';
import {DescriptionTable} from '@/uikit';
import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {getImageUrl} from '@/util/getImageUrl';
import {getProductsCategoryShowPath} from '@/pages/ProductCategory/routes';

import {getProductEditPath} from '../routes';


const ProductShow = () => {
    const productId = useParams<{productId: string}>().productId;
    const {data, error} = useAdminData<{product: ProductType}>(getApiRequestUrl(`/products/${productId}`));

    const history = useHistory();

    if (error) return <p>{error}</p>;
    if (!data) return <Preloader />;

    const {product} = data;

    return (
        <DescriptionTable>
            <Typography.Title level={3}>
                {`Продукт "${product.name}"`}
            </Typography.Title>

            <Space direction="horizontal">
                <DeleteBtn
                    url={getApiRequestUrl(`/products/${product.id}`)}

                    confirmationMessage="Вы точно хотите удалить продукт"
                    handleSuccess={() => history.push(getProductsCategoryShowPath(product.categoryId))}
                >
                    Удалить продукт
                </DeleteBtn>

                <Link to={getProductEditPath(product.id)}>
                    <Button type="primary">
                        Редактировать продукт
                    </Button>
                </Link>
            </Space>

            <DescriptionTable.Item
                name="Имя"
                value={product.name}
            />

            <DescriptionTable.Item
                name="Описание"
                value={product.shortDescription}
            />

            <DescriptionTable.Item
                name="Цена"
                value={product.price}
            />

            <DescriptionTable.Item
                name="Картинка"
                value={<img height={120} src={getImageUrl(product.image)} />}
            />

            {product.certificate && <DescriptionTable.Item
                name="Сертификат"
                value={<a download href={getImageUrl(product.certificate)}>ссылка</a>}
            />}

        </DescriptionTable>
    );
};

export default ProductShow;
