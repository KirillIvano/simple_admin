export const getImageUrl = (imageName: string): string =>
    `${__SERVER_ORIGIN__}/static/${imageName}`;
