export type ProductPreviewDto = {
    id: number;
    name: string;
    image: string;
}

export type CategoryPreviewDto = {
    id: number;
    name: string;
    image: string;
}

export type CategoryDto = {
    id: number;
    name: string;
    image: string;
}

export type CreateCategoryDto = {
    name: string;
    image: string;
}

export type UpdateCategoryDto = {
    name?: string;
    image?: string;
}
