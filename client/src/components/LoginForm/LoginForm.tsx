import { FC, FormEventHandler, useState } from "react";
import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Поле должно быть заполнено" }).email({ message: "Некорректный формат e-mail" }),
  password: z.string().min(1, { message: "Поле должно быть заполнено" })
})

export const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<z.ZodFormattedError<{
    email: string;
    password: string;
  }, string>>({
    email: { _errors: [] },
    password: { _errors: [] },
    _errors: []
  });

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"]})
    }
  }, queryClient);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const result = LoginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.format());
    } else {
      setErrors({
        email: { _errors: [] },
        password: { _errors: [] },
        _errors: []
      });
      loginMutation.mutate();
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField
        labelText="E-mail:"
        errorMessage={errors.email?._errors[0]}
      >
        <input
          className="form-field__input"
          type="text"
          name="email"
          onChange={event => setEmail(event.currentTarget.value)}
          value={email}
        />
      </FormField>
      <FormField
        labelText="Пароль:"
        errorMessage={errors.password?._errors[0]}
      >
        <input
          className="form-field__input"
          type="password"
          name="password"
          onChange={event => setPassword(event.currentTarget.value)}
          value={password}
        />
      </FormField>

      {loginMutation.error && <span className="form__error-message">{loginMutation.error.message}</span>}

      <Button
        type="submit"
        kind="primary"
        className="form__btn"
        isLoading={loginMutation.isPending}
      >
        Войти
      </Button>
    </form>
  )
}