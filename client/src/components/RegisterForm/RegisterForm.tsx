import { FC, useEffect, useState } from "react";
import { z } from "zod";
import "./RegisterForm.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { Institute, fetchInstituteList } from "../../api/Institutes";

const CreateUserScheme = z.object({
  email: z.string().email({ message: "E-mail должен содержать символ @"}),
  username: z.string().min(6, "Имя пользователя должно включать не менее 6 символов"),
  surname: z.string(),
  name: z.string(),
  lastname: z.string(),
  birthday: z.string(),
  institute: z.string(),
  cathedra: z.string(),
  course: z.number(),
  group: z.string(),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов")
});

type CreateUserForm = z.infer<typeof CreateUserScheme>;

export const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserForm>({
    resolver: zodResolver(CreateUserScheme)
  });

  const getInstituteListQuery = useQuery({
    queryFn: () => fetchInstituteList(),
    queryKey: ["institutes"],
    retry: 0
  }, queryClient);

  // const [instituteList, setInstituteList] = useState<Institute[] | undefined>();

  const [instituteId, setInstituteId] = useState<string>('');
  const [cathedra, setCathedra] = useState<string | undefined>('');
  // const [course, setCourse] = useState<number>(1);
  // const [group, setGroup] = useState<string>('');

  const createUserMutation = useMutation({
    mutationFn: (data: {
      email: string,
      username: string,
      surname: string,
      name: string,
      lastname: string,
      birthday: string,
      institute: string,
      cathedra: string,
      course: number,
      group: string,
      password: string
    }) => registerUser(
      data.email,
      data.username,
      data.surname,
      data.name,
      data.lastname,
      data.birthday,
      data.institute,
      data.cathedra,
      data.course,
      data.group,
      data.password
    )
  }, queryClient);

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({
        email,
        username,
        surname,
        name,
        lastname,
        birthday,
        institute,
        cathedra,
        course,
        group,
        password
      }) => {
        createUserMutation.mutate({ email, username, surname, name, lastname, birthday, institute, cathedra, course, group, password })
      })}
    >
      <FormField
        labelText="E-mail:"
        errorMessage={errors.email?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("email")}
        />
      </FormField>
      <FormField
        labelText="Имя пользователя:"
        errorMessage={errors.username?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("username")}
        />
      </FormField>
      <FormField
        labelText="Фамилия:"
        errorMessage={errors.surname?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("surname")}
        />
      </FormField>
      <FormField
        labelText="Имя:"
        errorMessage={errors.name?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("name")}
        />
      </FormField>
      <FormField
        labelText="Отчество:"
        errorMessage={errors.lastname?.message}
      >
        <input
          className="form-field__input"
          type="text"
          {...register("lastname")}
        />
      </FormField>
      <FormField
        labelText="Дата рождения:"
        errorMessage={errors.birthday?.message}
      >
        <input
          className="form-field__input"
          type="date"
          {...register("birthday")}
        />
      </FormField>
      <FormField
        labelText="ВУЗ:"
        errorMessage={errors.institute?.message}
      >
        <select
          id="institute"
          className="form-field__input"
          {...register("institute")}
          onChange={(event) => setInstituteId(event.currentTarget.value)}
          value={instituteId}
        >
          <option key={'none'} value="">-- Выберите ВУЗ --</option>
          {getInstituteListQuery.data?.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </FormField>
      <FormField
        labelText="Кафедра:"
        errorMessage={errors.cathedra?.message}
      >
        <select
          className="form-field__input"
          {...register("cathedra")}
          onChange={(event) => setCathedra(event.currentTarget.value)}
          value={cathedra}
        >
          <option value="">-- Выберите кафедру --</option>
          {/* {instituteId ? getInstituteListQuery.data?.find((item) => item.id === instituteId)} */}
        </select>
      </FormField>
      <FormField
        labelText="Курс:"
        errorMessage={errors.course?.message}
      >
        <select
          className="form-field__input"
          {...register("course")}
        >
          <option value="">-- Выберите курс --</option>
        </select>
      </FormField>
      <FormField
        labelText="Учебная группа:"
        errorMessage={errors.group?.message}
      >
        <select
          className="form-field__input"
          {...register("group")}
        >
          <option value="">-- Выберите учебную группу --</option>
        </select>
      </FormField>
      <FormField
        labelText="Придумайте пароль:"
        errorMessage={errors.password?.message}
      >
        <input
          className="form-field__input"
          type="password"
          {...register("password")}
        />
      </FormField>
      <Button
        kind="primary"
        type="submit"
        className="reg-form__btn"
        text="Зарегистрироваться"
        isLoading={createUserMutation.isPending}
      />
    </form>
  )
}