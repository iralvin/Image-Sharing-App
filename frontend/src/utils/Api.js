class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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

  addNewCard(imageName, imageLink, token) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: imageName,
        link: imageLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  deleteCard(cardToDelete, token) {
    return fetch(`${this._baseUrl}cards/${cardToDelete._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  setUserAvatar(newProfilePic, token) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: newProfilePic,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  setUserInfo(name, profession, token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: profession,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }

  changeCardLikeState(card, likeState, token) {
    return fetch(`${this._baseUrl}cards/${card._id}/likes`, {
      method: !likeState === true ? "PUT" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error " + res.statusText);
    });
  }
}

const api = new Api("https://www.api.awsia.students.nomoreparties.site/");

export default api;
