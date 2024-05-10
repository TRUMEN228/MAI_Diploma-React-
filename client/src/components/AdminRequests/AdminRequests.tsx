import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { fetchRequestsByInstituteId } from "../../api/Admin";
import { queryClient } from "../../api/QueryClient";
import { AdminStudentRequestView } from "../AdminStudentRequestView";
import "./AdminRequests.css";

interface IAdminRequestsProps {
  instituteId: string;
}

export const AdminRequests: FC<IAdminRequestsProps> = ({
  instituteId
}) => {
  const fetchRequestsQuery = useQuery({
    queryFn: () => fetchRequestsByInstituteId(instituteId),
    queryKey: ["requests"],
    retry: 0
  }, queryClient);

  const handleRefetch = () => {
    fetchRequestsQuery.refetch();
  }

  return (
    <div className="container requests__container">
      <div className="request__list">
        {fetchRequestsQuery.data?.length ? fetchRequestsQuery.data.map((item, index) => {
          switch (item.accountStatus) {
            case "student":
              return (
                <AdminStudentRequestView
                  key={index}
                  user={item}
                  handleRefetch={handleRefetch}
                />
              );
            case "teacher":
              return <></>;
          }
        }) : "Новых заявок нет"}
      </div>
    </div>
  );
};