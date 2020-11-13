export const getFormDataFromForm = (form: HTMLFormElement): FormData => {
    const formData = new FormData(form);

    for (const [field, value] of formData.entries()) {
        if (value instanceof File) {
            const elements = form.elements as unknown as Record<string, HTMLInputElement>;
            const fileInput = elements[field];

            if (!fileInput.files || !fileInput.files.length) {
                // Неважно, какое это поле, главное, чтобы оно стало пустым
                formData.set(field, '');
            }
        }
    }

    return formData;
};
