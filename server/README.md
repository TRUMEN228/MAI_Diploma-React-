# Серверная часть

## Запуск

Выполнить команду:

```shell
    npm run dev
```

## Роуты

<b>POST - методы<b>

- `/login` - авторизация, принимает параметры:

```json
{
  "email": "example@mail.ru",
  "password": "password"
}
```

- `/register` - регистрация, принимает параметры:

```json
{
  "email": "example@mail.ru",
  "username": "username",
  "fullName": "Иванов Иван Иванович",
  "birthday": "1999-12-31",
  "password": "password"
}
```

- `/logout` - прекращение авторизации пользователя, параметров не принимает.


<b>GET - методы<b>

- `/users/me` - регистрация, формат ответа:

```json
{
  "id": "4080a8c6-7f64-4a27-8dbd-85e6c7a15f28",
  "status": "student",
  "email": "example@mail.ru",
  "username": "username",
  "fullName": "Иванов Иван Иванович",
  "birthday": "1999-12-31",
}
```