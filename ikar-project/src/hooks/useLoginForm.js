import { useState } from "react";
import { getUserList } from "../modules/server-req.js";

const userList = await getUserList();

export function useLoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({});

  const formSubmit = () => {
    if (!login || !password) {
      setErrors(errors.concat({
        name: 'empty-fields',
        code: 'emp',
        text: 'Не все поля заполнены'
      }));
    } else {
      if (userList.some((user) => user.login === login || user.email === login)) {
        const currentUser = userList.find((user) => user.login === login || user.email === login);

        if (currentUser.password === password) {
          setUser(currentUser);
        } else {
          setErrors(errors.concat({
            name: 'incorrect-data',
            code: 'inc',
            text: 'Неверный логин или пароль'
          }));
        }
      } else {
        setErrors(errors.concat({
          name: 'incorrect-data',
          code: 'inc',
          text: 'Неверный логин или пароль'
        }));
      }

      console.log('pass');
    }

    if (errors.length) {
      console.log(errors);
    }
  };

  const getLogin = (value) => {
    setLogin(value);
  }

  const getPassword = (value) => {
    setPassword(value);
  }

  return {
    errors,
    userList,
    user,
    getLogin,
    getPassword,
    formSubmit,
  };
}