import { FC } from "react";
import { FormField } from "../FormField";
import "./UserProfileEditForm.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { User, editUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { Button } from "../Button";

const EditUserScheme = z.object({
  id: z.string(),
  email: z.optional(z.string().email({ message: 'Некорректный формат e-mail' })),
  username: z.optional(z.string().min(6, "Имя пользователя должно содержать не менее 6 символов")),
  surname: z.optional(z.string()),
  name: z.optional(z.string()),
  lastname: z.optional(z.string()),
  birthday: z.optional(z.string())
});

type EditUserForm = z.infer<typeof EditUserScheme>;

interface IUserProfileEditFormProps {
  user: User;
}

export const UserProfileEditForm: FC<IUserProfileEditFormProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditUserForm>({
    resolver: zodResolver(EditUserScheme)
  });

  const editUserMutation = useMutation({
    mutationFn: (data: {
      email?: string,
      username?: string,
      surname?: string,
      name?: string,
      lastname?: string,
      birthday?: string,
    }) => editUser(user.id, data.email, data.username, data.surname, data.name, data.lastname, data.birthday)
  }, queryClient);

  return (
    <div className="form__container">
      <form
        onSubmit={handleSubmit(({
          email,
          username,
          surname,
          name,
          lastname,
          birthday
        }) => {
          editUserMutation.mutate({ email, username, surname, name, lastname, birthday })
        })}
      >
        <FormField
          labelText="Фамилия:"
          errorMessage={errors.surname?.message}
        >
          <input
            type="text"
            className="form-field__input"
            value={user.surname}
            {...register("surname")}
          />
        </FormField>
        <FormField
          labelText="Имя:"
          errorMessage={errors.name?.message}
        >
          <input
            type="text"
            className="form-field__input"
            value={user.name}
            {...register("name")}
          />
        </FormField>
        <FormField
          labelText="Отчество:"
          errorMessage={errors.lastname?.message}
        >
          <input
            type="text"
            className="form-field__input"
            value={user.lastname}
            {...register("lastname")}
          />
        </FormField>
        <FormField
          labelText="Имя пользователя:"
          errorMessage={errors.username?.message}
        >
          <input
            type="text"
            className="form-field__input"
            value={user.username}
            {...register("username")}
          />
        </FormField>
        <FormField
          labelText="E-mail:"
          errorMessage={errors.email?.message}
        >
          <input
            type="email"
            className="form-field__input"
            value={user.email}
            {...register("email")}
          />
        </FormField>
        <FormField
          labelText="Дата рождения:"
          errorMessage={errors.birthday?.message}
        >
          <input
            type="date"
            className="form-field__input"
            value={user.birthday}
            {...register("birthday")}
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