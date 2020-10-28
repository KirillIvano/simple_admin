import React, {useEffect, useState} from 'react';
import {Button, Modal, message, Input, Space} from 'antd';
import classnames from 'classnames';

import {createCategory} from '@/services/products';
import {getImageUrl} from '@/util/getImageUrl';
import {useFetchJSON} from '@/hooks/useRequest';
import {useModalState} from '@/hooks/useModalState';
import {FileUpload} from '@/parts';
import {BlurredImage} from '@/uikit';


const CreateBtn: React.FC = () => {
    const {request, reset, success, loading} = useFetchJSON(createCategory);

    const [categoryImage, setCategoryImage] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryImageError, setImageError] = useState('');

    const {isOpen, open, close} = useModalState();

    useEffect(() => {
        categoryImageError && message.error(categoryImageError);
    }, [categoryImageError]);

    useEffect(() => {
        if (success && !loading) {
            close();
            reset();
        }
    }, [success, loading, close, reset]);

    return (
        <>
            <Button
                onClick={open}
                type="primary"
            >
                {'Добавить'}
            </Button>

            <Modal
                visible={true}
                closable={true}
                footer={null}
            >
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        request({image: categoryImage, name: categoryName});
                    }}
                >
                    <Space direction="vertical">
                        <FileUpload
                            caption="Фотография категории"
                            onError={error => setImageError(error)}
                            onUpload={fileName => setCategoryImage(fileName)}
                        />
                        {categoryImage && <BlurredImage src={getImageUrl(categoryImage)} />}

                        <Input
                            addonAfter="Название категории"
                            type="text"
                            name="name"
                            placeholder="Огнестойкие"
                            value={categoryName}
                            onChange={({currentTarget}) => setCategoryName(currentTarget.value)}
                        />

                        <Button
                            htmlType="submit"
                            type="primary"
                        >
                            Подтвердить
                        </Button>
                    </Space>
                </form>
            </Modal>
        </>
    );
};

export default CreateBtn;
