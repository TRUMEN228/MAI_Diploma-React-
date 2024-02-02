import "./css/Profile.css";
import { ProfileDataLabel } from "./ProfileDataLabel";
import { Button } from "./Button";

export const Profile = ({ user }) => {
  const profileContent = [
    {
      label: "Фамилия:",
      data: user.surname,
      type: "primary",
      labelClass: "profile__surname-label",
      dataClass: "profile__surname"
    },
    {
      label: "Имя:",
      data: user.name,
      type: "primary",
      labelClass: "profile__name-label",
      dataClass: "profile__name"
    },
    {
      label: "Отчество:",
      data: user.lastname,
      type: "primary",
      labelClass: "profile__lastname-label",
      dataClass: "profile__lastname"
    },
    {
      label: "Логин:",
      data: user.login,
      type: "secondary",
      labelClass: "profile__login-label",
      dataClass: "profile__login"
    },
    {
      label: "Дата рождения:",
      data: `${user.birthday.split('-')[2]}.${user.birthday.split('-')[1]}.${user.birthday.split('-')[0]}`,
      type: "secondary",
      labelClass: "profile__birthday-label",
      dataClass: "profile__birthday"
    },
    {
      label: "E-mail:",
      data: user.email,
      type: "secondary",
      labelClass: "profile__email-label",
      dataClass: "profile__email"
    }
  ];

  return (
    <div className="container">
      <h1 className="profile__title">
        Профиль пользователя
      </h1>
      <div className="profile__container">
        {profileContent.map((item) => (
          <ProfileDataLabel
            type={item.type}
            labelText={item.label}
            userData={item.data}
            labelClassName={item.labelClass}
            dataClassName={item.dataClass}
          />
        ))}
      </div>
    </div>
  );
};