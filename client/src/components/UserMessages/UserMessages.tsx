import { FC } from "react";
import "./UserMessages.css";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { fetchAllMessages } from "../../api/Message";
import { ChatView } from "../ChatView";
import { CreateMessageForm } from "../CreateMessageForm";

interface IUserMessagesProps {
  user: User;
};

export const UserMessages: FC<IUserMessagesProps> = ({
  user
}) => {
  const getMessagesQuery = useQuery({
    queryFn: () => fetchAllMessages(),
    queryKey: ["messages"],
    retry: 0
  }, queryClient);

  return (
    <div className="container">
      <ChatView
        messages={getMessagesQuery.data?.filter(item => item.groupId === user.groupId) || []}
      />
      <CreateMessageForm user={user}/>
    </div>
  );
};