import { FC, useState } from "react";
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../LoginForm";

import "./AuthForm.css";

type AuthFormType = "auth" | "register";

export const AuthForm: FC = () => {
  const [authType, setAuthType] = useState<AuthFormType>("auth");

  const handleClick = () => {
    setAuthType(prevState =>
      prevState === "register" ? "auth" : "register"
    );
  };

  return (
    <div className="auth-form">
      <p className="form__title">
        {authType === "register" ? "Регистрация" : "Авторизация"}
      </p>
      {authType === "register" ? <RegisterForm /> : <LoginForm />}
      <div className="form__switch">
        <span className="form__switch-text">
          {authType === "register" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}
        </span>
        <button className="form__switch-button" onClick={handleClick}>
          {authType === "register" ? "Войти" : "Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
};