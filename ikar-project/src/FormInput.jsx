import './css/FormInput.css';

export const FormInput = ({
  type,
  required,
  inputId,
  inputClassName,
  labelClassName,
  textContent,
  errorMsg,
  refInput
}) => {
  return (
    <>
      <label
        htmlFor={inputId}
        className={labelClassName ? 'input__label ' + labelClassName : 'input__label'}
      >
        {textContent + (required ? '*' : '') + ':'}
      </label>
      <input
        id={inputId}
        type={type}
        ref={refInput}
        className={inputClassName ? 'form__input ' + inputClassName : 'form__input'}
        placeholder={textContent + (required ? '*' : '')}
      />
      {errorMsg && <span className='input__error'>{errorMsg}</span>}
    </>
  );
};