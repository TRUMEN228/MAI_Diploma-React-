import { FC } from "react";
import { User } from "../../api/User";
import { Route, Routes } from "react-router-dom";
import { AdminRequests } from "../AdminRequests/AdminRequests";
import { UserProfile } from "../UserProfile";
import { AdminAddInstituteForm } from "../AdminAddInstituteForm";

interface IAccountRouterAdminProps {
  user: User;
}

export const AccountRouterAdmin: FC<IAccountRouterAdminProps> = ({ user }) => {
  return (
    <Routes>
      <Route
        path={`${user.id}/admin/requests`}
        element={<AdminRequests />}
      />
      <Route
        path={`${user.id}/admin/profile`}
        element={<UserProfile user={user}/>}
      />
      <Route
        path={`${user.id}/admin/addInstitute`}
        element={<AdminAddInstituteForm />}
      />
    </Routes>
  );
};