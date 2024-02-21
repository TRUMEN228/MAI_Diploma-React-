import { FC } from "react";
import "./AppHeader.css";
import { AppHeaderItem } from "../AppHeaderItem";

export type Page = "news" | "learning" | "messages" | "group" | "profile";

interface IAppHeaderProps {
  currentPage: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}

export const AppHeader: FC<IAppHeaderProps> = ({ currentPage, setPage }) => {
  const handleClick = (page: Page) => {
    setPage(page);
  }

  return (
    <header id="app-header">
      <div className="container header__container">
        <ul className="list-reset header__list">
          <AppHeaderItem id="news" onClick={() => handleClick("news")} currentPage={currentPage}>Новости</AppHeaderItem>
          <AppHeaderItem id="learning" onClick={() => handleClick("learning")} currentPage={currentPage}>Учеба</AppHeaderItem>
          <AppHeaderItem id="messages" onClick={() => handleClick("messages")} currentPage={currentPage}>Сообщения</AppHeaderItem>
          <AppHeaderItem id="group" onClick={() => handleClick("group")} currentPage={currentPage}>Моя группа</AppHeaderItem>
          <AppHeaderItem id="profile" onClick={() => handleClick("profile")} currentPage={currentPage}>Профиль</AppHeaderItem>
        </ul>
      </div>
    </header>
  );
};