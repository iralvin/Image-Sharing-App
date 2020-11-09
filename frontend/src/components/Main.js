import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function signOut() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    props.onLogout();
  }

  return (
    <>
      <Header
        onClick={signOut}
        buttonText="Log out"
        userEmail={props.userEmail}
        isLoggedIn={props.isLoggedIn}
      />
      <main>
        <section className="profile page__section">
          <img className="profile__avatar" src={currentUser.avatar} alt="" />
          <button
            className="profile__avatar-button button"
            onClick={props.onEditAvatar}
          ></button>

          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>

          <button
            className="profile__add-button button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="elements page__section">
          <ul className="elements__list">
            {props.cards.map((location, index) => {
              return (
                <Card
                  key={index}
                  location={location}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  onCardClick={(cardProps) => {
                    props.onCardClick(cardProps);
                  }}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
