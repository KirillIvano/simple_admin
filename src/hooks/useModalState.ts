import {useState, useCallback} from 'react';


export type UseModalType = [
    boolean,
    () => void,
    () => void,
]

export const useModalState = (initial = false): UseModalType => {
    const [isOpen, setOpen] = useState(initial);

    const open = useCallback(() => setOpen(true), []);
    const close = useCallback(() => setOpen(false), []);

    return [isOpen, open, close];
};
