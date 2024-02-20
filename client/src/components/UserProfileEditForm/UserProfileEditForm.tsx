import { FC } from "react";
import { FormField } from "../FormField";
import "./UserProfileEditForm.css";

export const UserProfileEditForm: FC = () => {
  return (
    <div className="form__container">
      <form>
        <FormField labelText="Фамилия:">
          <input
            type="text"
            className="form-field__input"
          />
        </FormField>
      </form>
    </div>
  )
}