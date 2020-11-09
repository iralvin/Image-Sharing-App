import React from "react";
import ReactDOM from "react-dom";
import PopupWithForm from "./PopupWithForm.js";
import InputField from "./InputField.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [profession, setProfession] = React.useState("");

  const [nameInputValidity, setNameInputValidity] = React.useState(true);
  const [professionInputValidity, setProfessionInputValidity] = React.useState(
    true
  );

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleProfessionChange(e) {
    setProfession(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      ...currentUser,
      name,
      about: profession,
    });
  }

  function checkNameInputValidity(inputValidity) {
    setNameInputValidity(inputValidity);
  }

  function checkProfessionInputValidity(inputValidity) {
    setProfessionInputValidity(inputValidity);
  }

  function handleClose() {
    props.onClose();
    setName(currentUser.name);
    setProfession(currentUser.about);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setProfession(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    if (!props.isOpen) {
      setName(currentUser.name);
      setProfession(currentUser.about);
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClosePopup={handleClose}
      type="edit"
      isOpen={props.isOpen}
      title="Edit profile"
      onSubmit={handleSubmit}
      isFormValid={
        nameInputValidity && professionInputValidity && !props.isSavingData
      }
      buttonText={props.isSavingData ? "Saving" : "Save"}
    >
      {props.isOpen && (
        <InputField
          inputClassName="popup__input popup__input_margin_top-input popup__input_type_name"
          id="name-input"
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Name"
          value={name || ""}
          onChange={handleNameChange}
          checkInputValidity={checkNameInputValidity}
          required
          spanClassName="popup__input-error"
          spanId="name-input-error"
        />
      )}

      {props.isOpen && (
        <InputField
          inputClassName="popup__input popup__input_margin_bottom-input popup__input_type_about-me"
          id="about-me-input"
          type="text"
          name="profession"
          minLength="2"
          maxLength="400"
          placeholder="About me"
          value={profession || ""}
          onChange={handleProfessionChange}
          checkInputValidity={checkProfessionInputValidity}
          required
          spanClassName="popup__input-error"
          spanId="about-me-input-error"
        />
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
