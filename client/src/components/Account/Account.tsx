import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { fetchMe } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { AccountView } from "../AccountView";

export const Account: FC = () => {
  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);

  switch (meQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return <AuthForm />;
    case "success":
      return <AccountView customData={meQuery.data.customData} user={meQuery.data.user} />;
  }
};