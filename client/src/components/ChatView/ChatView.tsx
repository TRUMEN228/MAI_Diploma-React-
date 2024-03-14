import { FC } from "react";
import { Message } from "../../api/Message";
import { MessageView } from "../MessageView";

interface IChatViewProps {
  messages: Message[];
};

export const ChatView: FC<IChatViewProps> = ({
  messages
}) => {
  return (
    <div className="chat__container">
      {messages.length ? messages.map((item) => (
        <MessageView message={item}/>
      )) : <p className="chat__empty">Сообщений нет</p>}
    </div>
  );
};