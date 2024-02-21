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
      return <>Новости</>;
    case "learning":
      return <>Учеба</>;
    case "messages":
      return <>Сообщения</>;
    case "group":
      return <>Моя группа</>;
    case "profile":
      return <UserProfile user={user}/>
  }
}