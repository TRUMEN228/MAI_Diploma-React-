import { useEffect, useRef, useState } from "react";
import { getUserList } from "../modules/server-req.js";

const userList = await getUserList();

export function useLoginForm() {
  const loginInput = useRef();
  const passwordInput = useRef();

  const formSubmit = () => {
    const login = loginInput.current.value;
    const password = passwordInput.current.value;

    const errorsArr = [];

    if (!login || !password) {
      errorsArr.push({
        name: 'empty-fields',
        code: 'emp',
        text: 'Не все поля заполнены'
      });
    } else {
      if (userList.some((user) => user.login === login || user.email === login)) {
        const currentUser = userList.find((user) => user.login === login || user.email === login);

        if (currentUser.password === password) {
          console.log('pass');
          localStorage.setItem('currentUser', JSON.stringify(user.id));
        } else {
          errorsArr.push({
            name: 'incorrect-data',
            code: 'inc',
            text: 'Неверный логин или пароль'
          });
        }
      } else {
        errorsArr.push({
          name: 'incorrect-data',
          code: 'inc',
          text: 'Неверный логин или пароль'
        });
      }
    }

    console.log(errorsArr ? errorsArr : null);
  };

  return {
    loginInput,
    passwordInput,
    formSubmit,
  };
}