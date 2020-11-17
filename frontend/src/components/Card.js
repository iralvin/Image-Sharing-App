import React from "react";
import ReactDOM from "react-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = React.useState(false);

  function handleLikeClick() {
    props.onCardLike(props.location, isLiked);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.location);
  }

  function handleClick() {
    props.onCardClick(props);
  }

  function setLikeImage() {
    setIsLiked(
      props.location.likes.some((userId) => {
        return currentUser._id === userId;
      })
    );
  }

  React.useEffect(() => {
    setLikeImage();
  }, [props.location]);

  return (
    <li className="elements__list-item">
      <button
        className="elements__trash button"
        onClick={handleDeleteClick}
        style={
          currentUser._id !== props.location.owner ? { display: "none" } : {}
        }
      ></button>
      <img
        className="elements__image"
        src={props.location.link}
        alt="location"
        onClick={handleClick}
      />
      <div className="elements__title-container">
        <h2 className="elements__location-name">{props.location.name}</h2>
        <div className="elements__like-container">
          <button
            onClick={handleLikeClick}
            className={`elements__like button ${
              isLiked && "elements__like_liked"
            }`}
          ></button>
          <p className="elements__number-likes">
            {props.location.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
