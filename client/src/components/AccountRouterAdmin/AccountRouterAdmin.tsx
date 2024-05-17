import { FC } from "react";
import { User } from "../../api/User";
import { Route, Routes } from "react-router-dom";
import { AdminRequests } from "../AdminRequests/AdminRequests";
import { UserProfile } from "../UserProfile";
import { AdminUsersView } from "../AdminUsersView";
import { AdminInstitutes } from "../AdminInstitutes";

interface IAccountRouterAdminProps {
  user: User;
}

export const AccountRouterAdmin: FC<IAccountRouterAdminProps> = ({ user }) => {
  return (
    <Routes>
      <Route
        path={`${user.id}/admin/requests`}
        element={<AdminRequests instituteId={user.instituteId}/>}
      />
      <Route
        path={`${user.id}/admin/profile`}
        element={<UserProfile user={user}/>}
      />
      <Route
        path={`${user.id}/admin/addInstitute`}
        element={<AdminInstitutes/>}
      />
      <Route
        path={`${user.id}/admin/usersList`}
        element={<AdminUsersView />}
      />
    </Routes>
  );
};