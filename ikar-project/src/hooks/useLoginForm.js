import { useEffect, useRef, useState } from "react";
import { getUserList } from "../modules/server-req.js";

const userList = await getUserList();

export function useLoginForm() {
  const loginInput = useRef();
  const passwordInput = useRef();

  const [error, setErrors] = useState();
  const [user, setUser] = useState();

  const formSubmit = () => {
    const login = loginInput.current.value;
    const password = passwordInput.current.value;

    if (!login || !password) {
      setErrors({
        name: 'empty-fields',
        code: 'emp',
        text: 'Не все поля заполнены'
      });
    } else {
      if (userList.some((user) => user.login === login || user.email === login)) {
        const currentUser = userList.find((user) => user.login === login || user.email === login);

        if (currentUser.password === password) {
          setUser(currentUser);
          console.log('pass');
          console.log(user);
        } else {
          setErrors({
            name: 'incorrect-data',
            code: 'inc',
            text: 'Неверный логин или пароль'
          });
        }
      } else {
        setErrors({
          name: 'incorrect-data',
          code: 'inc',
          text: 'Неверный логин или пароль'
        });
      }
    }

    if (error) {
      console.log(error);
    }
  };

  return {
    error,
    userList,
    user,
    loginInput,
    passwordInput,
    formSubmit,
  };
}