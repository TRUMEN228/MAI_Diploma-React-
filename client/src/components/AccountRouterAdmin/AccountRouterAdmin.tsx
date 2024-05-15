import { FC } from "react";
import { User } from "../../api/User";
import { Route, Routes } from "react-router-dom";
import { AdminRequests } from "../AdminRequests/AdminRequests";
import { UserProfile } from "../UserProfile";
import { AdminAddInstituteForm } from "../AdminAddInstituteForm";
import { AdminUsersView } from "../AdminUsersView";

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
        element={<AdminAddInstituteForm />}
      />
      <Route
        path={`${user.id}/admin/usersList`}
        element={<AdminUsersView />}
      />
    </Routes>
  );
};