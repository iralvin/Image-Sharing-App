import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import Main from "./Main.js";
import Footer from "./Footer.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import PopupWithImage from "./PopupWithImage.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";

import api from "../utils/Api.js";

import fail from "../images/fail.png";
import success from "../images/success.png";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopup] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false);

  const [infoTooltip, setInfoTooltip] = React.useState({});

  const [cardToDelete, setCardToDelete] = React.useState({});
  const [isSavingData, setIsSavingData] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    location: {
      link: "",
      name: "",
    },
  });
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  const history = useHistory();

  const successMessage = "Success! You have now been registered.";
  const failMessage = "Oops, something went wrong! Please try again.";

  const handleCardClick = (cardClicked) => {
    setImagePopup(true);
    setSelectedCard(cardClicked);
  };

  const handleClosePopups = () => {
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setImagePopup(false);
    setDeleteCardPopup(false);
    setInfoTooltipPopup(false);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      handleClosePopups();
    }
  };

  const handleAvatarUpdate = (updatedUserInfo) => {
    setCurrentUser(updatedUserInfo);
    setIsSavingData(true);
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      return api
        .setUserAvatar(updatedUserInfo.avatar, token)
        .then(() => {
          setIsSavingData(false);
          handleClosePopups();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateUser = (updatedUserInfo) => {
    setCurrentUser(updatedUserInfo);
    setIsSavingData(true);
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      return api
        .setUserInfo(updatedUserInfo.name, updatedUserInfo.about, token)
        .then(() => {
          setIsSavingData(false);
          handleClosePopups();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleCardLike(card, likeState) {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      api
        .changeCardLikeState(card, likeState, token)
        .then((result) => {
          setCards(
            cards.map((card, index) => {
              if (card._id === result._id) {
                return result;
              }
              return card;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    setDeleteCardPopup(true);
    setCardToDelete(card);
  }

  function confirmCardDelete() {
    setIsSavingData(true);

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      return api
        .deleteCard(cardToDelete, token)
        .then(() => {
          setCards(
            cards.filter((card) => {
              if (card._id !== cardToDelete._id) {
                return card;
              }
            })
          );
        })
        .then(() => {
          setIsSavingData(false);
          handleClosePopups();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleAddPlaceSubmit(imageName, imageLink) {
    setIsSavingData(true);
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      return api
        .addNewCard(imageName, imageLink, token)
        .then((result) => {
          setCards([...cards, result]);
        })
        .then(() => {
          setIsSavingData(false);
          handleClosePopups();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function navToRoute(route) {
    history.push(route);
  }

  function handleLogin(email) {
    setIsLoggedIn(true);
    setUserEmail(email);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserEmail("");
  }

  function handleInfoTooltips(image, message) {
    setInfoTooltipPopup(true);
    setInfoTooltip({ image, message });
  }

  function handleLoginAuth(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          handleLogin(email);
          navToRoute("/main");
          return;
        }
        return Promise.reject();
      })
      .catch((err) => {
        handleInfoTooltips(fail, failMessage);
      });
  }

  function handleRegisterAuth(email, password) {
    auth
      .register(email, password)
      .then((user) => {
        if (user) {
          handleLogin(user.email);
          handleInfoTooltips(success, successMessage);
          navToRoute("/main");
          return;
        }
        return Promise.reject();
      })
      .catch((err) => {
        console.log("Error registering new account.");
        handleInfoTooltips(fail, failMessage);
      });
  }

  function handleCheckToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth
        .checkToken(token)
        .then((user) => {
          handleLogin(user.email);
        })
        .then((res) => {
          navToRoute("/main");
        })
        .catch((err) => {
          console.log("auth - failed to verify token");
        });
    } else {
      console.log("no previous user token");
    }
  }

  React.useEffect(() => {
    handleCheckToken();
  }, []);

  React.useEffect(() => {
    function getUserInfo() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        api
          .getUserInfo(token)
          .then((result) => {
            setCurrentUser(result);
          })
          .catch((err) => {
            console.log("logged " + err);
          });
      }
    }
    if (isLoggedIn) {
      getUserInfo();
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    function getInitialCardsData() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        api
          .getInitialCards(token)
          .then((result) => {
            setCards(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    if (isLoggedIn) {
      getInitialCardsData();
    }
  }, [isLoggedIn]);

  document.addEventListener("keyup", handleEscKey);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={handleClosePopups}
          infoTooltip={infoTooltip}
        />

        <Switch>
          <ProtectedRoute
            path="/main"
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={(cardClicked) => {
              handleCardClick(cardClicked);
            }}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
            onLogout={handleLogout}
            userEmail={userEmail}
          />

          <Route path="/register">
            <Register
              onSubmit={(email, password) => {
                handleRegisterAuth(email, password);
              }}
              onNavClick={(route) => {
                navToRoute(route);
              }}
            />
          </Route>

          <Route path="/login">
            <Login
              onSubmit={(email, password) => {
                handleLoginAuth(email, password);
              }}
              onNavClick={(route) => {
                navToRoute(route);
              }}
            />
          </Route>

          <Route path="/">
            {isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />}
          </Route>
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClosePopups}
          onSubmit={handleAvatarUpdate}
          isSavingData={isSavingData}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClosePopups}
          onSubmit={handleUpdateUser}
          isSavingData={isSavingData}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClosePopups}
          onSubmit={handleAddPlaceSubmit}
          isSavingData={isSavingData}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={handleClosePopups}
          onSubmit={confirmCardDelete}
          isSavingData={isSavingData}
        />

        <PopupWithImage
          isOpen={isImagePopupOpen}
          link={selectedCard.location.link}
          name={selectedCard.location.name}
          onClose={handleClosePopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
