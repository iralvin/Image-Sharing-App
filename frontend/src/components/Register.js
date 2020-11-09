import React from "react";

import Header from "./Header.js";
import Account from "./Account.js";
import InputField from "./InputField.js";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [confirmPassword, setConfirmPassword] = React.useState("");

  const [emailInputValidity, setEmailInputValidity] = React.useState(false);
  const [passwordInputValidity, setPasswordInputValidity] = React.useState(
    false
  );

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // function handleConfirmPasswordChange(e) {
  //   setConfirmPassword(e.target.value);
  // }

  function checkEmailInputValidity(inputValidity) {
    setEmailInputValidity(inputValidity);
  }

  function checkPasswordInputValidity(inputValidity) {
    setPasswordInputValidity(inputValidity);
  }

  function navToLogin() {
    props.onNavClick("/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(email, password);
  }

  return (
    <>
      <Header onClick={navToLogin} buttonText="Log in" />
      <Account
        title="Sign Up"
        flairText="Already a member? Log in here!"
        buttonText="Sign up"
        onSubmit={handleSubmit}
        onClick={navToLogin}
        isFormValid={emailInputValidity && passwordInputValidity}
      >
        <InputField
          inputClassName="popup__input popup__input_margin_top-input popup__input_type_email account__input"
          id="user-email"
          type="email"
          name="email"
          minLength="2"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          value={email || ""}
          checkInputValidity={checkEmailInputValidity}
          spanClassName="popup__input-error"
          spanId="user-email-error"
        />

        <InputField
          inputClassName="popup__input popup__input_margin_bottom-input popup__input_type_password account__input"
          id="user-password"
          type="password"
          name="password"
          minLength="8"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          value={password || ""}
          checkInputValidity={checkPasswordInputValidity}
          spanClassName="popup__input-error"
          spanId="user-password-error"
        />
      </Account>
    </>
  );
}

export default Register;
