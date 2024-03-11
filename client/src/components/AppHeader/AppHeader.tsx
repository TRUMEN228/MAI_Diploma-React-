import { FC } from "react";
import "./AppHeader.css";
import { AppHeaderItem } from "../AppHeaderItem";

export const AppHeader: FC = () => {
  // const handleClick = (page: Page) => {
  //   setPage(page);
  // }

  return (
    <header id="app-header">
      <div className="container header__container">
        <nav className="list-reset header__list">
          <AppHeaderItem to={"/account/news"}>Новости</AppHeaderItem>
          <AppHeaderItem to={"/account/learning"}>Обучение</AppHeaderItem>
          <AppHeaderItem to={"/account/messages"}>Сообщения</AppHeaderItem>
          <AppHeaderItem to={"/account/group"}>Моя группа</AppHeaderItem>
          <AppHeaderItem to={"/account/profile"}>Профиль</AppHeaderItem>
        </nav>
      </div>
    </header>
  );
};