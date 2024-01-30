import './css/FormInput.css';

export const FormInput = ({
  type,
  required,
  inputId,
  inputClassName,
  labelClassName,
  textContent,
  errorMsg,
  getValue
}) => {
  const handleValueChange = (event) => {
    getValue(event.target.value);
  }

  return (
    <>
      <label htmlFor={inputId} className={labelClassName ? 'input__label ' + labelClassName : 'input__label'}>{textContent + (required ? '*' : '') + ':'}</label>
      <input id={inputId} type={type} className={inputClassName ? 'form__input ' + inputClassName : 'form__input'} placeholder={textContent + (required ? '*' : '')} onChange={handleValueChange}/>
      {errorMsg && <span className='input__error'>{errorMsg}</span>}
    </>
  );
};