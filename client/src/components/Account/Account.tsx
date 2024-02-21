import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { fetchMe } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { AppHeader } from "../AppHeader";
import { AccountView } from "../AccountView/AccountView";
import { Page } from "../AppHeader";

export const Account: FC = () => {
  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);

  const [currentPage, setCurrentPage] = useState<Page>("profile");

  switch (meQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return <AuthForm />;
    case "success":
      return (
        <>
          <AppHeader currentPage={currentPage} setPage={setCurrentPage}/>
          <AccountView user={meQuery.data} page={currentPage}/>
        </>
      );
  }
}