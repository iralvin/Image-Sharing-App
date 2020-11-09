import React from "react";
import ReactDOM from "react-dom";
import PopupWithForm from "./PopupWithForm.js";
import InputField from "./InputField.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarLinkInput = React.useRef();

  const [avatarLink, setAvatarLink] = React.useState("");
  const [linkInputValidity, setLinkInputValidity] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      ...currentUser,
      avatar: avatarLinkInput.current.value,
    });
  }

  function checkLinkInputValidity(inputValidity) {
    setLinkInputValidity(inputValidity);
  }

  const handleChange = (e) => {
    setAvatarLink(e.target.value);
  };

  React.useEffect(() => {
    if (!props.isOpen) {
      setAvatarLink("");
      setLinkInputValidity(false);
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClosePopup={props.onClose}
      type="profile-pic"
      isOpen={props.isOpen}
      title="Change profile picture"
      onSubmit={handleSubmit}
      isFormValid={linkInputValidity && !props.isSavingData}
      buttonText={props.isSavingData ? "Saving" : "Save"}
    >
      {props.isOpen && (
        <InputField
          refs={avatarLinkInput}
          inputClassName="popup__input popup__input_margin_top-input popup__input_type_name"
          id="profile-pic-link"
          type="url"
          name="profile-pic"
          minLength="2"
          placeholder="Image Link"
          required
          onChange={handleChange}
          value={avatarLink || ""}
          checkInputValidity={checkLinkInputValidity}
          spanClassName="popup__input-error"
          spanId="profile-pic-link-error"
        />
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
