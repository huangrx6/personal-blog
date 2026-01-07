import React from 'react';
import {message} from "antd";

interface MessageTipProps {
    type: number;
    msg: string;
}

export enum MessageType {
    success = 10,
    error = 20
}

const MessageTip: React.FC<MessageTipProps> = ({type, msg}) => {

    const [messageApi, contextHolder] = message.useMessage();

    if (MessageType.error === type) {
        messageApi.error(msg).then();
    }

    return (
        <div id="message-tip" className="-z-50">
            {contextHolder}
        </div>
    );
};

export default MessageTip;