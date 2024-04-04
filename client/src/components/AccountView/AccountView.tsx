import { FC } from "react";
import { AppHeader } from "../AppHeader";
import { User } from "../../api/User";
import { AccountStatusRouter } from "../AccountStatusRouter";
import "../AppHeader/AppHeader.css";
import "../AppHeaderItem/AppHeaderItem.css";

interface IAccountViewProps {
  user: User;
}

export const AccountView: FC<IAccountViewProps> = ({ user }) => {
  return (
    <>
      <AppHeader userId={user.id}/>

      <AccountStatusRouter user={user} />
    </>
  );
}