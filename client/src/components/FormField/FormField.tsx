import { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  labelText: string;
  errorMessage?: string;
  children: ReactNode;
}

export const FormField: FC<IFormFieldProps> = ({
  labelText,
  errorMessage,
  children
}) => {
  return (
    <label className="form-field">
      <span className="form-field__label">{labelText}</span>
      {children}
      {errorMessage && (
        <span className="form-field__error">{errorMessage}</span>
      )}
    </label>
  );
};