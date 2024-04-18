import { FC } from "react";
import { AppHeaderStudent } from "../AppHeaderStudent";
import { User } from "../../api/User";
import { AccountStatusRouter } from "../AccountStatusRouter";
import { AppHeaderAdmin } from "../AppHeaderAdmin";

interface IAccountViewProps {
  user: User;
}

export const AccountView: FC<IAccountViewProps> = ({ user }) => {
  switch (user.accountStatus) {
    case "student":
      return (
        <>
          <AppHeaderStudent userId={user.id} />
          <AccountStatusRouter user={user} />
        </>
      );
    case "teacher":
      return (
        <>
          <AccountStatusRouter user={user} />
        </>
      );
    case "admin":
      return (
        <>
          <AppHeaderAdmin userId={user.id} />
          <AccountStatusRouter user={user} />
        </>
      )
  }
}