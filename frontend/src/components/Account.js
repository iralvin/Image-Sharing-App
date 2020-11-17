import React from "react";

function Account(props) {
  return (
    <div className="account page__section">
      <form
        onSubmit={props.onSubmit}
        className="account__form"
        action="#"
        noValidate
        autoComplete="off"
      >
        <h2 className="account__title">{props.title}</h2>

        {props.children}

        <button
          className={`account__submit button ${
            props.isFormValid ? "" : "button_inactive"
          }`}
          type="submit"
          disabled={!props.isFormValid}
        >
          {props.buttonText}
        </button>
        <p className="account__flair-text" onClick={props.onClick}>
          {props.flairText}
        </p>
      </form>
    </div>
  );
}

export default Account;
