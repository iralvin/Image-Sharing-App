const baseUrl = "https://www.api.alvinw-social.students.nomoreparties.site";

const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name: "asdf" }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",

      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        return data;
      }
    });
};

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export { register, authorize, checkToken };
