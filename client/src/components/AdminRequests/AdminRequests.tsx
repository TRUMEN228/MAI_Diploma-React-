import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { fetchRequests } from "../../api/Admin";
import { queryClient } from "../../api/QueryClient";
import { fetchInstituteList } from "../../api/Institutes";
import { AdminRequestView } from "../AdminRequestView";
import "./AdminRequests.css";

export const AdminRequests: FC = () => {
  const fetchRequestsQuery = useQuery({
    queryFn: () => fetchRequests(),
    queryKey: ["requests"],
    retry: 0
  }, queryClient);

  const fetchInstituteQuery = useQuery({
    queryFn: () => fetchInstituteList(),
    queryKey: ["institutes"],
    retry: 0
  }, queryClient);

  const splitInstituteId = (groupId: string) => {
    const instituteList = fetchInstituteQuery.data;
    const idArr = groupId.split('.', 3);

    const institute = instituteList?.find(item => item.id === idArr[0]);
    const cathedra = institute?.cathedras.find(item => item.shortName === idArr[1]);
    const course = cathedra?.courses.find(item => item.course === idArr[2]);
    const group = course?.groups.find(item => item.groupId === groupId);

    return {
      institute: institute?.name,
      cathedra: cathedra?.name,
      course: course?.course,
      group: group?.globalName
    };
  };

  return (
    <div className="container requests__container">
      <div className="request__list">
        {fetchRequestsQuery.data?.length ? fetchRequestsQuery.data.map((item) => (
          <AdminRequestView
            key={item.id}
            user={item}
            instituteName={splitInstituteId(item.groupId).institute}
            cathedraName={splitInstituteId(item.groupId).cathedra}
            courseName={splitInstituteId(item.groupId).course}
            group={splitInstituteId(item.groupId).group}
          />
        )) : "Новых заявок нет"}
      </div>
    </div>
  );
};