import { FC } from "react";
import { Message } from "../../api/Message";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import "./MessageView.css";

interface IMessageViewProps {
  userId: string
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
  userId,
  message
}) => {
  const getUserQuery = useQuery({
    queryFn: () => fetchUser(message.userId),
    queryKey: ["users", message.userId],
    retry: 0
  }, queryClient);

  return (
    <div key={message.id} className={userId === message.userId ? "own-message__container" : "message__container"}>
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
                  <div className="file__begin">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="0 0 100.25 100.25"
                    >
                      <path d="M79.567,29.924l-18.26-18.479C61.025,11.16,60.641,11,60.24,11H20.5c-0.828,0-1.5,0.672-1.5,1.5v75
                        c0,0.828,0.672,1.5,1.5,1.5h58c0.828,0,1.5-0.672,1.5-1.5V30.979C80,30.585,79.845,30.206,79.567,29.924z M62,16.415L74.929,29.5H62
                        V16.415z M22,86V14h37v17c0,0.828,0.672,1.5,1.5,1.5H77V86H22z"/>
                    </svg>
                    <p className="file__name">{item.name}</p>
                  </div>
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