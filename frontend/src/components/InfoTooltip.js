import React from "react";

function InfoTooltip(props) {
  function handleClose(e) {
    console.log(e.target);
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("button")
    ) {
      props.onClose();
    }
  }

  return (
    <div
      onClick={handleClose}
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__dialog-window popup_type_tooltip">
        <button className="popup__close button" onClick={handleClose}></button>
        <div className="popup__tooltip_container">
          <img
            className="popup__tooltip_image"
            src={props.infoTooltip.image}
            alt="tooltip"
          />
          <p className="popup__tooltip_message">{props.infoTooltip.message}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
