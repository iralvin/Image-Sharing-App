import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup(props) {

    function handleSubmit(e){
        e.preventDefault();
        props.onSubmit()
    }


  return (
    <PopupWithForm
      type="delete"
      onClosePopup={props.onClose}
      isOpen={props.isOpen}
      title="Are you sure?"
      onSubmit={handleSubmit}
      isFormValid={!props.isSavingData}
      buttonText={props.isSavingData ? "Deleting" : "Yes"}
    />
  );
}

export default DeleteCardPopup;