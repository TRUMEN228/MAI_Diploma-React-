import { FC } from "react";
import { Teacher } from "../../api/Teacher";
import { User } from "../../api/User";
import { Route, Routes } from "react-router-dom";
import { UserProfile } from "../UserProfile";
import { TeacherSubjects } from "../TeacherSubjects";
import { UserMessages } from "../UserMessages";

interface IAccountRouterTeacherProps {
  teacher: Teacher;
  user: User;
}

export const AccountRouterTeacher: FC<IAccountRouterTeacherProps> = ({
  teacher,
  user
}) => {
  return (
    <Routes>
      <Route
        path={`${user.id}/account/messages`}
        element={<UserMessages customData={teacher} user={user}/>}
      />
      <Route
        path={`${user.id}/account/subjects`}
        element={<TeacherSubjects teacher={teacher} />}
      />
      <Route
        path={`${user.id}/account/profile`}
        element={<UserProfile customData={teacher} user={user}/>}
      />
    </Routes>
  );
};