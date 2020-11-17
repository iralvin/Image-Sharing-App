import React from "react";
import ReactDOM from "react-dom";

function PopupWithImage(props) {
  return (
    <div
      className={`popup popup_type_image  ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__image-container">
        <button
          className="popup__close button"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure-container">
          <img
            src={props.link}
            alt={props.name}
            className="popup__full-size-image"
          />
          <figcaption className="popup__image-caption">{props.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default PopupWithImage;
