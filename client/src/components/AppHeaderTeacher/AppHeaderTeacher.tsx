import { FC } from "react";
import "./AppHeaderTeacher.css";
import { AppHeaderItem } from "../AppHeaderItem";

interface IAppHeaderTeacherProps {
  userId: string;
}

export const AppHeaderTeacher: FC<IAppHeaderTeacherProps> = ({
  userId
}) => {
  return (
    <header id="app-header">
      <div className="container header__container">
        <nav className="header__list">
          <AppHeaderItem to={`${userId}/account/messages`}>Сообщения</AppHeaderItem>
          <AppHeaderItem to={`${userId}/account/subjects`}>Мои предметы</AppHeaderItem>
          <AppHeaderItem to={`${userId}/account/profile`}>Профиль</AppHeaderItem>
        </nav>
      </div>
    </header>
  );
};