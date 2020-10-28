import {useState, useCallback} from 'react';


export type UseModalType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useModalState = (): UseModalType => {
    const [isOpen, setOpen] = useState(false);

    const open = useCallback(() => setOpen(true), []);
    const close = useCallback(() => setOpen(false), []);

    return {isOpen, open, close};
};
