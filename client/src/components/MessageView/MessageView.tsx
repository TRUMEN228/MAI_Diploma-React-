import { FC } from "react";
import { Message } from "../../api/Message";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import "./MessageView.css";

interface IMessageViewProps {
  message: Message;
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

const formatFileSize = (size: number, value: 'KB' | 'MB' | 'GB') => {
  switch (value) {
    case 'KB':
      return size / 1024;
    case 'MB':
      return size / 1024 / 1024;
    case 'GB':
      return size / 1024 / 1024/ 1024;
  }
}

export const MessageView: FC<IMessageViewProps> = ({
  message
}) => {
  const getUserQuery = useQuery({
    queryFn: () => fetchUser(message.userId),
    queryKey: ["users", message.userId],
    retry: 0
  }, queryClient);

  return (
    <div key={message.id} className="message__container">
      <div className="message__info">
        <p className="message__user">{getUserQuery.data?.surname} {getUserQuery.data?.name} {message.userStatus === "teacher" && <span className="message__is-teacher">(преподаватель)</span>}</p>
        <p className="message__datetime">{formatDate(message.sentAt)}</p>
      </div>
      <div className="message__content">
        <p className="message__text">{message.text}</p>
        <div className="message__files">
          {message.files?.length ? message.files.map((item) => {
            if (item) {
              return (
                <a key={item.name} href={item.downloadUrl} className="message__file">
                  <p className="file__name">{item.name}</p>
                  <p className="file__size">{formatFileSize(item.size ? item.size : 0, 'MB').toFixed(2)} Мб</p>
                </a>
              );
            }
          }) : null}
        </div>
      </div>
    </div>
  );
};