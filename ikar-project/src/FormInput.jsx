import './css/FormInput.css';

export const FormInput = ({type, inputId, inputClassName, labelClassName, textContent, errorMsg, getValue}) => {
  const handleValueChange = (event) => {
    getValue(event.target.value);
  }

  return (
    <>
      <label htmlFor={inputId} className={labelClassName ? 'input__label ' + labelClassName : 'input__label'}>{textContent + ':'}</label>
      <input id={inputId} type={type} className={inputClassName ? 'form__input ' + inputClassName : 'form__input'} placeholder={textContent} onChange={handleValueChange}/>
      {errorMsg && <span className='input__error'>{errorMsg}</span>}
    </>
  );
};