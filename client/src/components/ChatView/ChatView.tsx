import { FC } from "react";
import { Message } from "../../api/Message";
import { MessageView } from "../MessageView";
import "./ChatView.css";

interface IChatViewProps {
  userId: string;
  messages: Message[];
};

export const ChatView: FC<IChatViewProps> = ({
  userId,
  messages
}) => {
  return (
    <div className="chat__container">
      {messages.length ? messages.map((item) => (
        <MessageView key={item.id} userId={userId} message={item}/>
      )) : <p className="chat__empty">Сообщений нет</p>}
    </div>
  );
};