import { FC, useState } from "react";
import { User, fetchMe, logout } from "../../api/User";
import { UserProfileLabel } from "../UserProfileLabel";
import { Button } from "../Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import "./UserProfile.css";
import { ModalWindow } from "../ModalWindow";
import { UserProfileEditForm } from "../UserProfileEditForm";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  return date.toLocaleString("ru", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

interface IUserProfileProps {
  user: User;
}

export const UserProfile: FC<IUserProfileProps> = ({ user }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] })
    }
  }, queryClient);

  const handleClick = () => {
    logoutMutation.mutate();
    meQuery.refetch();
    window.location.pathname = "/";
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <div id="app-main">
      <div className="container">
        <h1 className="profile__title">
          Профиль пользователя
        </h1>
        <div className="profile__container">
          <div className="profile__edit-btn" onClick={handleModalOpen}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 9.5002V12.0002H2.5L9.87333 4.62687L7.37333 2.12687L0 9.5002ZM11.8067 2.69354C12.0667 2.43354 12.0667 2.01354 11.8067 1.75354L10.2467 0.193535C9.98667 -0.0664648 9.56667 -0.0664648 9.30667 0.193535L8.08667 1.41354L10.5867 3.91354L11.8067 2.69354Z" fill="#434343"/>
            </svg>
          </div>

          <UserProfileLabel
            labelText="Фамилия:"
            userData={user.surname}
            labelClassName="profile__surname-label"
            dataClassName="profile__surname"
          />
          <UserProfileLabel
            labelText="Имя:"
            userData={user.name}
            labelClassName="profile__name-label"
            dataClassName="profile__name"
          />
          <UserProfileLabel
            labelText="Отчество:"
            userData={user.lastname}
            labelClassName="profile__lastname-label"
            dataClassName="profile__lastname"
          />
          <UserProfileLabel
            kind="secondary"
            labelText="Имя пользователя:"
            userData={user.username}
            labelClassName="profile__username-label"
            dataClassName="profile__username"
          />
          <UserProfileLabel
            kind="secondary"
            labelText="E-mail:"
            userData={user.email}
            labelClassName="profile__email-label"
            dataClassName="profile__email"
          />
          <UserProfileLabel
            kind="secondary"
            labelText="Дата рождения:"
            userData={formatDate(user.birthday)}
            labelClassName="profile__birthday-label"
            dataClassName="profile__birthday"
          />
          <Button
            kind="secondary"
            text="Выйти"
            className="profile__exit-button"
            onClick={handleClick}
            isLoading={logoutMutation.isPending}
          />

          <ModalWindow isOpened={modalOpen} onModalClose={handleModalClose}>
            <h1 className="edit-form__title">Редактирование профиля</h1>
            <UserProfileEditForm user={user}/>
          </ModalWindow>
        </div>
      </div>
    </div>
  )
}