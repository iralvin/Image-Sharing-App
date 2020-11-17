import React from "react";
import ReactDOM from "react-dom";

function PopupWithForm(props) {
  function handleClose(e) {
    if (e.target.classList.contains("popup")) {
      props.onClosePopup();
    }
  }

  return (
    <div
      onClick={handleClose}
      className={`popup popup_type_${props.type} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__dialog-window">
        <button
          className="popup__close button"
          onClick={props.onClosePopup}
        ></button>
        <form
          onSubmit={props.onSubmit}
          className="popup__form"
          action="#"
          noValidate
          autoComplete="off"
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}

          <button
            className={`popup__submit create-button button ${
              props.isFormValid ? "" : "button_inactive"
            }`}
            type="submit"
            disabled={!props.isFormValid}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
