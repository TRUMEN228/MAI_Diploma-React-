import { FC, useState } from "react";
import "./TeacherMessages.css";
import { User } from "../../api/User";
import { Teacher } from "../../api/Teacher";
import { CreateMessageForm } from "../CreateMessageForm";
import { useQuery } from "@tanstack/react-query";
import { fetchMessagesByGroupId } from "../../api/Message";
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
  const [groupId, setGroupId] = useState<string>(teacher.subjects[0].groupId);

  const emptyInstitute: Institute = {
    id: "",
    name: "",
    cathedras: []
  };

  const getMessagesQuery = useQuery({
    queryFn: () => fetchMessagesByGroupId(groupId),
    queryKey: ["messages", groupId],
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
      <select
        onChange={(event) => setGroupId(event.currentTarget.value)}
        value={groupId}
      >
        {teacher.subjects.map((item, index) => (
          <option key={index} value={item.groupId}>{item.name} | Группа {getInstituteData(item.groupId)}</option>
        ))}
      </select>

      <ChatView
        messages={getMessagesQuery.isSuccess ? getMessagesQuery.data : []}
      />
      <CreateMessageForm
        groupId={groupId}
        user={user}
        handleRefetch={handleRefetch}
      />
    </>
  );
};