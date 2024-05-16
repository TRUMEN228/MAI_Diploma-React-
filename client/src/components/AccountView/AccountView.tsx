import { FC } from "react";
import { AppHeaderStudent } from "../AppHeaderStudent";
import { User } from "../../api/User";
import { AccountStatusRouter } from "../AccountStatusRouter";
import { AppHeaderAdmin } from "../AppHeaderAdmin";
import { Student } from "../../api/Student";
import { Teacher } from "../../api/Teacher";
import { AppHeaderTeacher } from "../AppHeaderTeacher";

interface IAccountViewProps {
  customData: Student | Teacher | {};
  user: User;
}

export const AccountView: FC<IAccountViewProps> = ({
  customData,
  user
}) => {
  switch (user.accountStatus) {
    case "student":
      return (
        <>
          <AppHeaderStudent userId={user.id} />
          <AccountStatusRouter customData={customData} user={user} />
        </>
      );
    case "teacher":
      return (
        <>
          <AppHeaderTeacher userId={user.id} />
          <AccountStatusRouter customData={customData} user={user} />
        </>
      );
    case "admin":
      return (
        <>
          <AppHeaderAdmin userId={user.id} />
          <AccountStatusRouter customData={customData} user={user} />
        </>
      )
  }
}