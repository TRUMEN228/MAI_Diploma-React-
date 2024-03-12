import { FC } from "react";
import "./AppHeader.css";
import { AppHeaderItem } from "../AppHeaderItem";

interface IAppHeaderProps {
  userId: string;
}

export const AppHeader: FC<IAppHeaderProps> = ({ userId }) => {
  return (
    <header id="app-header">
      <div className="container header__container">
        <nav className="list-reset header__list">
          <AppHeaderItem to={`${userId}/account/news`}>Новости</AppHeaderItem>
          <AppHeaderItem to={`${userId}/account/learning`}>Обучение</AppHeaderItem>
          <AppHeaderItem to={`${userId}/account/messages`}>Сообщения</AppHeaderItem>
          <AppHeaderItem to={`${userId}/account/group`}>Моя группа</AppHeaderItem>
          <AppHeaderItem to={`${userId}/account/profile`}>Профиль</AppHeaderItem>
        </nav>
      </div>
    </header>
  );
};