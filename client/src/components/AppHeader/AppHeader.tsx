import { FC, useState } from "react";
import "./css/AppHeader.css";
import { AppHeaderItem } from "../AppHeaderItem";

export type HeaderPage = "news" | "learning" | "messages" | "group" | "profile";

export const AppHeader: FC = () => {
  const [currentPage, setCurrentPage] = useState<HeaderPage>("profile");

  return (
    <header id="app-header">
      <div className="container header__container">
        <ul className="list-reset header__list">
          <AppHeaderItem id="news" onClick={() => setCurrentPage("news")} currentPage={currentPage}>Новости</AppHeaderItem>
          <AppHeaderItem id="learning" onClick={() => setCurrentPage("learning")} currentPage={currentPage}>Учеба</AppHeaderItem>
          <AppHeaderItem id="messages" onClick={() => setCurrentPage("messages")} currentPage={currentPage}>Сообщения</AppHeaderItem>
          <AppHeaderItem id="group" onClick={() => setCurrentPage("group")} currentPage={currentPage}>Моя группа</AppHeaderItem>
          <AppHeaderItem id="profile" onClick={() => setCurrentPage("profile")} currentPage={currentPage}>Профиль</AppHeaderItem>
        </ul>
      </div>
    </header>
  );
};