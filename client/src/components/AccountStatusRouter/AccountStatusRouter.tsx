import { FC } from "react";
import { User } from "../../api/User";
import { AccountRouterStudent } from "../AccountRouterStudent";
import { AccountRouterAdmin } from "../AccountRouterAdmin";

interface IAccountStatusRouterProps {
  user: User;
}

export const AccountStatusRouter: FC<IAccountStatusRouterProps> = ({ user }) => {
  switch (user.accountStatus) {
    case "student":
      return <AccountRouterStudent user={user}/>;
    case "teacher":
      return <></>;
    case "admin":
      return <AccountRouterAdmin user={user}/>;
  }
}