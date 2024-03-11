import { FC } from "react";
import { AppHeader } from "../AppHeader";
import { User } from "../../api/User";
import { BrowserRouter } from "react-router-dom";
import "../AppHeader/AppHeader.css";
import "../AppHeaderItem/AppHeaderItem.css";
import { AccountRouter } from "../AccountRouter";

interface IAccountViewProps {
  user: User;
}

export const AccountView: FC<IAccountViewProps> = ({ user }) => {
  return (
    <BrowserRouter>
      <AppHeader />

      <AccountRouter user={user} />
    </BrowserRouter>
  );
}