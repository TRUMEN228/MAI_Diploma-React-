import { FC } from "react";
import { Message } from "../../api/Message";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import "./MessageView.css";

interface IMessageViewProps {
  message: Message;
  key: string;
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const MessageView: FC<IMessageViewProps> = ({
  message,
  ...props
}) => {
  const userQuery = useQuery({
    queryFn: () => fetchUser(message.userId),
    queryKey: ["users", message.userId],
    retry: 0
  }, queryClient);

  return (
    <div {...props} className="message__container">
      <div className="message__info">
        <p className="message__user">{`${userQuery.data?.surname} ${userQuery.data?.name}`}</p>
        <p className="message__datetime">{formatDate(message.sentAt)}</p>
      </div>
      <div className="message__content">
        <p className="message__text">{message.text}</p>
        {message.files?.length ? message.files.map((item) => {
          if (item) {
            return (
              <a key={item.name} href={item.downloadUrl} className="message__file">
                <p className="file__name">{item.name}</p>
                <p className="file__size">{item.size}</p>
              </a>
            );
          }
        }) : null}
      </div>
    </div>
  );
};