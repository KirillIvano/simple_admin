import {message} from 'antd';


interface MessagesSender {
    success: (text: string) => void;
    error: (text: string) => void;
}

export const useMessages = (): MessagesSender => message;
