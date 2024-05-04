import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { User } from "../../api/User";
import { UserProfile } from "../UserProfile";
import { StudentMessages } from "../UserMessages";
import { StudentGroup } from "../StudentGroup";

interface IAccountRouterStudentProps {
  user: User;
}

export const AccountRouterStudent: FC<IAccountRouterStudentProps> = ({ user }) => {
  return (
    <Routes>
      <Route
        path={`${user.id}/account/news`}
        element={<>Новости</>}
      />
      <Route
        path={`${user.id}/account/learning`}
        element={<>Обучение</>}
      />
      <Route
        path={`${user.id}/account/messages`}
        element={<StudentMessages user={user} />}
      />
      <Route
        path={`${user.id}/account/group`}
        element={<StudentGroup user={user}/>}
      />
      <Route
        path={`${user.id}/account/profile`}
        element={<UserProfile user={user} />}
      />
    </Routes>
  );
};