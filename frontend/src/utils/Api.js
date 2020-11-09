class Api {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  getUserInfo() {
    this._options.method = "GET";
    return fetch(`${this._baseUrl}users/me`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  getInitialCards() {
    this._options.method = "GET";
    return fetch(`${this._baseUrl}cards`, this._options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject("Error " + res.statusText);
      })
      .then((result) => {
        return result;
      });
  }

  addNewCard(imageName, imageLink) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      name: imageName,
      link: imageLink,
    });

    return fetch(`${this._baseUrl}cards`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  deleteCard(cardToDelete) {
    this._options.method = "DELETE";
    return fetch(
      `${this._baseUrl}cards/${cardToDelete._id}`,
      this._options
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  setUserAvatar(newProfilePic) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({
      avatar: newProfilePic,
    });

    return fetch(`${this._baseUrl}users/me/avatar`, this._options).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject("Error " + res.statusText);
      }
    );
  }

  setUserInfo(name, profession) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({
      name: name,
      about: profession,
    });

    return fetch(`${this._baseUrl}users/me`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  changeCardLikeState(card, likeState) {
    this._options.method = !likeState === true ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}cards/likes/${card._id}`, this._options).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject("Error " + res.statusText);
      }
    );
  }
}

const api = new Api("https://around.nomoreparties.co/v1/group-3/", {
  headers: {
    authorization: "0519b525-02c0-4fb8-9c6d-6c37076de85e",
    "Content-Type": "application/json",
  },
});

export default api;
