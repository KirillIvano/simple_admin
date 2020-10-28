import {observable, computed, action} from 'mobx';

import {
    ProductCategoryPreviewType,
    ProductCategoryType,
    ProductPreviewType,
    ProductsStoreInterface,
    ProductType,
} from '@/entities/products/types';


export class ProductsStore implements ProductsStoreInterface {
    @observable private _products = new Map<number, ProductType>();
    @observable private _productsPreviews = new Map<number, ProductPreviewType>();
    @observable private _productCategories = new Map<number, ProductCategoryType>();
    @observable private _productCategoriesPreviews = new Map<number, ProductCategoryPreviewType>();

    @computed
    get products(): Map<number, ProductType> {
        return this._products;
    }

    @computed
    get productsCategories(): Map<number, ProductCategoryType> {
        return this._productCategories;
    }

    @computed
    get productsPreviews(): ProductPreviewType[] {
        return [...this._productsPreviews.values()];
    }

    @computed
    get productsCategoriesPreviews(): ProductCategoryPreviewType[] {
        return [...this._productCategoriesPreviews.values()];
    }

    @action
    addProduct = (product: ProductType): void => {
        this._products.set(product.id, product);
    }

    @action
    addProductPreview = (product: ProductPreviewType): void => {
        this._productsPreviews.set(product.id, product);
    }

    @action
    addProductPreviews = (previews: ProductPreviewType[]): void => {
        for (const preview of previews) {
            this.addProductPreview(preview);
        }
    }

    @action
    addCategory = (category: ProductCategoryType): void => {
        this._productCategories.set(category.id, category);
    };

    @action
    addCategoryPreview = (categoryPreview: ProductCategoryPreviewType): void => {
        this._productCategoriesPreviews.set(categoryPreview.id, categoryPreview);
    };

    @action
    addCategoryPreviews = (categoryPreviews: ProductCategoryPreviewType[]): void => {
        for (const preview of categoryPreviews) {
            this.addCategoryPreview(preview);
        }
    }
}
