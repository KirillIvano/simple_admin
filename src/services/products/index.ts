import {getApiRequestUrl} from '@/util/getApiRequestUrl';
import {request, ResponseType} from '@/util/request';

import {
    CategoryDto,
    CategoryPreviewDto,
    ProductPreviewDto,
    CreateCategoryDto,
} from './dto';


export const getProducts = (): Promise<ResponseType<{products: ProductPreviewDto[]}>> =>
    request(getApiRequestUrl('/products'));

export const getCategoriesPreviews = (): Promise<ResponseType<CategoryPreviewDto[]>> =>
    request(getApiRequestUrl('/products/categories'));

export const createCategory = (body: CreateCategoryDto): Promise<ResponseType<CategoryDto>> =>
    request(
        getApiRequestUrl('/products/categories'),
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
