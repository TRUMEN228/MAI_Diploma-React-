import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { User } from "../../api/User";
import { UserProfile } from "../UserProfile";
import { UserMessages } from "../UserMessages";
import { StudentGroup } from "../StudentGroup";
import { Student } from "../../api/Student";

interface IAccountRouterStudentProps {
  student: Student;
  user: User;
}

export const AccountRouterStudent: FC<IAccountRouterStudentProps> = ({
  student,
  user
}) => {
  return (
    <Routes>
      <Route
        path={`${student.id}/account/news`}
        element={<>Новости</>}
      />
      <Route
        path={`${student.id}/account/learning`}
        element={<>Обучение</>}
      />
      <Route
        path={`${student.id}/account/messages`}
        element={<UserMessages student={student} user={user} />}
      />
      <Route
        path={`${student.id}/account/group`}
        element={<StudentGroup student={student}/>}
      />
      <Route
        path={`${student.id}/account/profile`}
        element={<UserProfile customData={student} user={user}/>}
      />
    </Routes>
  );
};