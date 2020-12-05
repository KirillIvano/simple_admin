export type ProductPreviewType = {
    id: number;
    categoryId: number;
    name: string;
}

export type ProductCategoryType = {
    id: number;
    name: string;
}

export type ProductCategoryPreviewType = {
    id: number;
    name: string;
    image: string;
}

export type ProductType = {
    id: number;
    categoryId: number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;

    image: string;
    certificate?: string;
}

export type ProductsStoreInterface = {
    products: Map<number, ProductType>;
    productsCategories: Map<number, ProductCategoryType>;
    productsPreviews: ProductPreviewType[];
    productsCategoriesPreviews: ProductCategoryPreviewType[];

    addProduct: (product: ProductType) => void;
    addProductPreview: (preview: ProductPreviewType) => void;
    addProductPreviews: (previews: ProductPreviewType[]) => void;
    addCategory: (category: ProductCategoryType) => void;
    addCategoryPreview: (categoryPreview: ProductCategoryPreviewType) => void;
    addCategoryPreviews: (categoryPreviews: ProductCategoryPreviewType[]) => void;
}
