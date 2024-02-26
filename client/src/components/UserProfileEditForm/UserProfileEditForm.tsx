import { FC, useState, FormEventHandler } from "react";
import { FormField } from "../FormField";
import "./UserProfileEditForm.css";
import { useMutation } from "@tanstack/react-query";
import { User, editUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { Button } from "../Button";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User";

interface IUserProfileEditFormProps {
  user: User;
}

export const UserProfileEditForm: FC<IUserProfileEditFormProps> = ({ user }) => {
  const [surname, setSurname] = useState<string>(user.surname);
  const [name, setName] = useState<string>(user.name);
  const [lastname, setLastname] = useState<string>(user.lastname);
  const [email, setEmail] = useState<string>(user.email);
  const [birthday, setBirthday] = useState<string>(user.birthday);
  const [username, setUsername] = useState<string>(user.username);

  const editUserMutation = useMutation({
    mutationFn: () => editUser(user.id, email, username, surname, name, lastname, birthday)
  }, queryClient);

  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    editUserMutation.mutate();

    meQuery.refetch();
  }

  return (
    <div className="edit-form__container">
      <form
        onSubmit={handleSubmit}
      >
        <FormField
          labelText="Фамилия:"
        >
          <input
            type="text"
            className="form-field__input"
            name="surname"
            value={surname}
            onChange={event => setSurname(event.currentTarget.value)}
          />
        </FormField>
        <FormField
          labelText="Имя:"
        >
          <input
            type="text"
            className="form-field__input"
            name="name"
            value={name}
            onChange={event => setName(event.currentTarget.value)}
          />
        </FormField>
        <FormField
          labelText="Отчество:"
        >
          <input
            type="text"
            className="form-field__input"
            name="lastname"
            value={lastname}
            onChange={event => setLastname(event.currentTarget.value)}
          />
        </FormField>
        <FormField
          labelText="Имя пользователя:"
        >
          <input
            type="text"
            className="form-field__input"
            name="username"
            value={username}
            onChange={event => setUsername(event.currentTarget.value)}
          />
        </FormField>
        <FormField
          labelText="E-mail:"
        >
          <input
            type="email"
            className="form-field__input"
            name="email"
            value={email}
            onChange={event => setEmail(event.currentTarget.value)}
          />
        </FormField>
        <FormField
          labelText="Дата рождения:"
        >
          <input
            type="date"
            className="form-field__input"
            name="birthday"
            value={birthday}
            onChange={event => setBirthday(event.currentTarget.value)}
          />
        </FormField>
        <Button
          kind="primary"
          type="submit"
          text="Применить"
          isLoading={editUserMutation.isPending}
        />
      </form>
    </div>
  )
}