import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppHeader } from "../AppHeader";
import { User } from "../../api/User";
import { AccountRouter } from "../AccountRouter";
import "../AppHeader/AppHeader.css";
import "../AppHeaderItem/AppHeaderItem.css";

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