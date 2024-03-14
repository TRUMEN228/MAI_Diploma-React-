import { FC, useState } from "react";
import "./UserMessages.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { File, createMessage, fetchMessagesByGroup } from "../../api/Message";
import { ChatView } from "../ChatView";
import { CreateMessageForm } from "../CreateMessageForm";

interface IUserMessagesProps {
  user: User;
};

export const UserMessages: FC<IUserMessagesProps> = ({
  user
}) => {
  const getMessagesQuery = useQuery({
    queryFn: () => fetchMessagesByGroup(user.group),
    queryKey: ["messages"],
    retry: 0
  }, queryClient);





  return (
    <div className="container">
      <ChatView messages={getMessagesQuery.data || []}/>
      <CreateMessageForm user={user}/>
    </div>
  );
};