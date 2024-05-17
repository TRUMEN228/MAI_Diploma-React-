import { FC, useState } from "react";
import { ChatView } from "../ChatView";
import { CreateMessageForm } from "../CreateMessageForm";
import { Student } from "../../api/Student";
import { User } from "../../api/User";
import { useQuery } from "@tanstack/react-query";
import { fetchMessagesBySubjectId } from "../../api/Message";
import { queryClient } from "../../api/QueryClient";
import { fetchSubjectsByGroupId } from "../../api/Teacher";
import { FormField } from "../FormField";

interface IStudentMessagesProps {
  student: Student;
  user: User;
}

export const StudentMessages: FC<IStudentMessagesProps> = ({
  student,
  user
}) => {
  const getSubjectsQuery = useQuery({
    queryFn: () => fetchSubjectsByGroupId(student.groupId),
    queryKey: ["subjects", student.groupId],
    retry: 0
  }, queryClient);

  const [subjectId, setSubjectId] = useState<string>(getSubjectsQuery.isSuccess ? getSubjectsQuery.data[0].subject.id : "none");

  const getMessagesQuery = useQuery({
    queryFn: () => fetchMessagesBySubjectId(subjectId),
    queryKey: ["messages", subjectId],
    retry: 0
  }, queryClient);

  const handleRefetch = () => {
    getMessagesQuery.refetch();
  }

  return (
    <>
      <FormField
        labelText="Предмет:"
      >
        <select
          onChange={(event) => setSubjectId(event.currentTarget.value)}
          value={subjectId}
        >
          {
            getSubjectsQuery.isSuccess ?
            getSubjectsQuery.data.map((item, index) => (
              <option
                key={index}
                value={item.subject.id}
              >
                {item.subject.name} | Преподаватель {item.teacher.surname} {item.teacher.name[0]}. {item.teacher.lastname[0]}.
              </option>
            ))
            : null
          }
        </select>
      </FormField>

      <ChatView
        userId={user.id}
        messages={getMessagesQuery.isSuccess ? getMessagesQuery.data : []}
      />
      <CreateMessageForm
        subjectId={subjectId}
        handleRefetch={handleRefetch}
        user={user}
      />
    </>
  );
};