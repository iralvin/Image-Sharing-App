import React from "react";

import Header from "./Header.js";
import Account from "./Account.js";
import InputField from "./InputField.js";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  function checkEmailInputValidity(inputValidity) {
    setEmailInputValidity(inputValidity);
  }

  function checkPasswordInputValidity(inputValidity) {
    setPasswordInputValidity(inputValidity);
  }

  function navToRegister() {
    props.onNavClick("/register");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(email, password);
  }

  return (
    <>
      <Header onClick={navToRegister} buttonText="Sign up" />
      <Account
        title="Log in"
        flairText="Not a member yet? Sign up here!"
        buttonText="Log in"
        onSubmit={handleSubmit}
        onClick={navToRegister}
        linkPath="/register"
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

export default Login;
