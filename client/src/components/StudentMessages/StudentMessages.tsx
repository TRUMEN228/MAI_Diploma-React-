import { FC } from "react";
import { ChatView } from "../ChatView";
import { CreateMessageForm } from "../CreateMessageForm";
import { Student } from "../../api/Student";
import { User } from "../../api/User";
import { useQuery } from "@tanstack/react-query";
import { fetchMessagesByGroupId } from "../../api/Message";
import { queryClient } from "../../api/QueryClient";

interface IStudentMessagesProps {
  student: Student;
  user: User;
}

export const StudentMessages: FC<IStudentMessagesProps> = ({
  student,
  user
}) => {
  const getMessagesQuery = useQuery({
    queryFn: () => fetchMessagesByGroupId(student.groupId),
    queryKey: ["messages", student.groupId],
    retry: 0
  }, queryClient);

  const handleRefetch = () => {
    getMessagesQuery.refetch();
  }

  return (
    <>
      <ChatView
        messages={getMessagesQuery.isSuccess ? getMessagesQuery.data : []}
      />
      <CreateMessageForm
        groupId={student.groupId}
        handleRefetch={handleRefetch}
        user={user}
      />
    </>
  );
};