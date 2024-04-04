import { FC } from "react";
import { User } from "../../api/User";
import { Route, Routes } from "react-router-dom";
import { AdminRequests } from "../AdminRequests/AdminRequests";

interface IAccountRouterAdminProps {
  user: User;
}

export const AccountRouterAdmin: FC<IAccountRouterAdminProps> = ({ user }) => {
  return (
    <Routes>
      <Route
        path={`${user.id}/account/requests`}
        element={<AdminRequests />}
      />
    </Routes>
  );
};