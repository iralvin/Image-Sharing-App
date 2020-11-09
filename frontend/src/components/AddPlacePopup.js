import React from "react";
import ReactDOM from "react-dom";
import PopupWithForm from "./PopupWithForm.js";
import InputField from "./InputField.js";

function AddPlacePopup(props) {
  const [imageName, setImageName] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");

  const [nameInputValidity, setNameInputValidity] = React.useState(false);
  const [linkInputValidity, setLinkInputValidity] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(imageName, imageLink);
  }

  function handleNameChange(e) {
    setImageName(e.target.value);
  }

  function handleLinkChange(e) {
    setImageLink(e.target.value);
  }

  function checkNameInputValidity(inputValidity) {
    setNameInputValidity(inputValidity);
  }

  function checkLinkInputValidity(inputValidity) {
    setLinkInputValidity(inputValidity);
  }

  React.useEffect(() => {
    if (!props.isOpen) {
      setNameInputValidity(false);
      setLinkInputValidity(false);

      setImageName("");
      setImageLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClosePopup={props.onClose}
      type="add"
      isOpen={props.isOpen}
      title="New place"
      onSubmit={handleSubmit}
      isFormValid={
        nameInputValidity && linkInputValidity && !props.isSavingData
      }
      buttonText={props.isSavingData ? "Saving" : "Save"}
    >
      {props.isOpen && (
        <InputField
          inputClassName="popup__input popup__input_margin_top-input popup__input_type_title"
          id="title-input"
          type="text"
          name="name"
          placeholder="Title"
          minLength="2"
          maxLength="30"
          required
          value={imageName || ""}
          onChange={handleNameChange}
          checkInputValidity={checkNameInputValidity}
          spanClassName="popup__input-error"
          spanId="title-input-error"
        />
      )}

      {props.isOpen && (
        <InputField
          inputClassName="popup__input popup__input_margin_bottom-input popup__input_type_image-link"
          id="image-link-input"
          type="url"
          name="link"
          placeholder="Image link"
          required
          onChange={handleLinkChange}
          value={imageLink || ""}
          checkInputValidity={checkLinkInputValidity}
          spanClassName="popup__input-error"
          spanId="image-link-input-error"
        />
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
