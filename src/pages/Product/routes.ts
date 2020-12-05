export const getProductShowPath = (productId: number) =>
    `/products/${productId}/show`;

export const getProductEditPath = (productId: number) =>
    `/products/${productId}/edit`;

export const getProductCreatePath = (categoryId: number, from: string) =>
    `/products/create?categoryId=${categoryId}&redirectTo=${from}`;
