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

  // const [currentPage, setCurrentPage] = useState<Page>("profile");

  switch (meQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return <AuthForm />;
    case "success":
      return <AccountView user={meQuery.data} />;
  }
};