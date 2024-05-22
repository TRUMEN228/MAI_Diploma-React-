import { FC, useState } from "react";
import "./TeacherMessages.css";
import { User } from "../../api/User";
import { Teacher } from "../../api/Teacher";
import { CreateMessageForm } from "../CreateMessageForm";
import { useQuery } from "@tanstack/react-query";
import { fetchMessagesBySubjectId } from "../../api/Message";
import { queryClient } from "../../api/QueryClient";
import { ChatView } from "../ChatView";
import { Institute, fetchInstitute } from "../../api/Institutes";

interface ITeacherMessagesProps {
  teacher: Teacher;
  user: User;
}

export const TeacherMessages: FC<ITeacherMessagesProps> = ({
  teacher,
  user,
}) => {
  const [subjectId, setSubjectId] = useState<string>(teacher.subjects[0].id);

  const emptyInstitute: Institute = {
    id: "",
    name: "",
    cathedras: []
  };

  const getMessagesQuery = useQuery({
    queryFn: () => fetchMessagesBySubjectId(subjectId),
    queryKey: ["messages", subjectId],
    retry: 0
  }, queryClient);

  const getInstituteQuery = useQuery({
    queryFn: () => fetchInstitute(teacher.instituteId),
    queryKey: ["institutes", teacher.instituteId],
    retry: 0
  }, queryClient);

  function splitGroupId(groupId: string) {
    const props = groupId.split(".", 3);

    return {
      cathedraId: props[1],
      course: props[2],
    };
  }

  function getInstituteData(groupId: string) {
    const institute: Institute = getInstituteQuery.isSuccess ? getInstituteQuery.data : emptyInstitute;
    const splitedId = splitGroupId(groupId);

    return institute.cathedras.find(prop => prop.id === splitedId.cathedraId)?.courses.find(prop => prop.course === splitedId.course)?.groups.find(prop => prop.id === groupId)?.name;
  }

  const handleRefetch = () => {
    getMessagesQuery.refetch();
  }

  return (
    <>
      <label className="message-subject__label">
        Предмет:&nbsp;
        <select
          className="message-subject__select"
          onChange={(event) => setSubjectId(event.currentTarget.value)}
          value={subjectId}
        >
          {teacher.subjects.map((item, index) => (
            <option key={index} value={item.id}>{item.name} | Группа {getInstituteData(item.groupId)}</option>
          ))}
        </select>
      </label>

      <ChatView
        userId={user.id}
        messages={getMessagesQuery.isSuccess ? getMessagesQuery.data : []}
      />
      <CreateMessageForm
        subjectId={subjectId}
        user={user}
        handleRefetch={handleRefetch}
      />
    </>
  );
};