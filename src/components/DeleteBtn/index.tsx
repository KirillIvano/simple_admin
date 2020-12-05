import React from 'react';
import {Button, Modal, Space} from 'antd';

import {AdminForm} from '@/admin-lib/components';
import {useModalState} from '@/hooks/useModalState';


type DeleteBtnProps = {
    url: string;
    children: string;
    confirmationMessage: string;

    className?: string;

    handleSuccess?: () => void;
    handleError?: () => void;
}

const DeleteBtn = ({
    url,
    children,
    confirmationMessage,

    className,

    handleSuccess,
    handleError,
}: DeleteBtnProps) => {
    const [isOpen, open, close] = useModalState(false);

    return (
        <>
            <Button
                danger
                type="primary"
                onClick={open}
                className={className}
            >
                {children}
            </Button>

            <Modal
                visible={isOpen}
                onCancel={close}

                closable={true}
                footer={null}
            >
                <Space
                    direction="vertical"
                    size="middle"
                >
                    <div>{confirmationMessage}</div>

                    <Space>
                        <AdminForm
                            action={url}
                            method="DELETE"
                            dataType="json"

                            onSuccess={handleSuccess}
                            onError={handleError}
                        >
                            <Button
                                htmlType="submit"
                                type="primary"
                                danger
                            >
                                {'Подтвердить'}
                            </Button>
                        </AdminForm>

                        <Button
                            type="default"
                            onClick={close}
                        >
                            {'Отменить'}
                        </Button>
                    </Space>
                </Space>
            </Modal>
        </>
    );
};

export default DeleteBtn;
