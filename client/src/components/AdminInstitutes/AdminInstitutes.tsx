import { FC } from "react";
import { AdminAddInstituteForm } from "../AdminAddInstituteForm";
import { AdminInstitutesList } from "../AdminInstitutesList";
import { useQuery } from "@tanstack/react-query";
import { fetchInstituteList } from "../../api/Institutes";
import { queryClient } from "../../api/QueryClient";

export const AdminInstitutes: FC = () => {
  const getInstitutesQuery = useQuery({
    queryFn: () => fetchInstituteList(),
    queryKey: ["institutes"],
    retry: 0
  }, queryClient);

  const handleRefetch = () => {
    getInstitutesQuery.refetch();
  }

  return (
    <div className="container add-institute-form__container">
      <AdminInstitutesList
        institutes={getInstitutesQuery.isSuccess ? getInstitutesQuery.data : []}
        handleRefetch={handleRefetch}
      />
      <AdminAddInstituteForm handleRefetch={handleRefetch}/>
    </div>
  );
};