import { FC } from "react";
import { Page } from "../AppHeader";
import { UserProfile } from "../UserProfile";
import { User } from "../../api/User";

interface IAccountViewProps {
  page?: Page;
  user: User;
}

export const AccountView: FC<IAccountViewProps> = ({ page = "profile", user }) => {
  switch (page) {
    case "news":
      return <></>;
    case "learning":
      return <></>;
    case "messages":
      return <></>;
    case "group":
      return <></>;
    case "profile":
      return <UserProfile user={user}/>
  }
}