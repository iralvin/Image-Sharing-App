import React from "react";

function InputField(props) {
  const [inputValidity, setInputValidity] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    props.onChange(e);

    if (!e.target.validity.valid) {
      setInputValidity(false);
      setErrorMessage(e.target.validationMessage);
    } else {
      setInputValidity(true);
      setErrorMessage("");
    }
  }

  React.useEffect(() => {
    if (props.value !== "") {
      setInputValidity(true);
      setErrorMessage("");
    }
  }, []);

  React.useEffect(() => {
    props.checkInputValidity(inputValidity);
  }, [inputValidity, errorMessage]);

  return (
    <>
      <input
        ref={props.refs}
        className={props.inputClassName}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required
        value={props.value}
        onChange={handleInputChange}
      />
      <span
        className={`${props.spanClassName} ${
          inputValidity ? "" : "popup__input-error_visible"
        }`}
        id={props.spanId}
      >
        {errorMessage}
      </span>
    </>
  );
}

export default InputField;
