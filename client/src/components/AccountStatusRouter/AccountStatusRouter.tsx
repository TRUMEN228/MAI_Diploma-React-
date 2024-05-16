import { FC } from "react";
import { User } from "../../api/User";
import { AccountRouterStudent } from "../AccountRouterStudent";
import { AccountRouterAdmin } from "../AccountRouterAdmin";
import { Student } from "../../api/Student";
import { Teacher } from "../../api/Teacher";
import { AccountRouterTeacher } from "../AccountRouterTeacher";

interface IAccountStatusRouterProps {
  customData: Student | Teacher | {};
  user: User;
}

export const AccountStatusRouter: FC<IAccountStatusRouterProps> = ({
  customData,
  user
}) => {
  switch (user.accountStatus) {
    case "student":
      return <AccountRouterStudent student={customData as Student} user={user}/>;
    case "teacher":
      return <AccountRouterTeacher teacher={customData as Teacher} user={user}/>;
    case "admin":
      return <AccountRouterAdmin user={user}/>;
  }
}