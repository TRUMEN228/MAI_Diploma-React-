import { FC, useState } from "react";
import { User, fetchMe, logout } from "../../api/User";
import { UserProfileLabel } from "../UserProfileLabel";
import { Button } from "../Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/QueryClient";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { Teacher } from "../../api/Teacher";
import { Student } from "../../api/Student";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  return date.toLocaleString("ru", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

interface IUserProfileProps {
  customData?: Student | Teacher | {};
  user: User;
}

export const UserProfile: FC<IUserProfileProps> = ({ user }) => {
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
  }

  return (
    <div id="app-main">
      <div className="container">
        <h1 className="profile__title">
          Профиль пользователя
        </h1>
        <div className="profile__container">
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
              onClick={handleClick}
              className="profile__exit-button"
              isLoading={logoutMutation.isPending}
            >
              <Link className="profile__exit-button-link" to={'/'}>Выйти</Link>
            </Button>
        </div>
      </div>
    </div>
  )
}