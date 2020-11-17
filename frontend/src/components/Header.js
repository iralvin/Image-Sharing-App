import React from "react";

import logo from "../images/logo.svg";
import closeIcon from "../images/close-icon.png";
import hamburger from "../images/hamburger-icon.png";

function Header(props) {
  const [isDisplayed, setIsDisplayed] = React.useState(false);

  function displayUserInfo() {
    setIsDisplayed(!isDisplayed);
  }

  return (
    <>
      <nav
        className={`header__nav-menu header__nav-menu_mobile ${
          isDisplayed && props.isLoggedIn
            ? "header__nav-menu_mobile_visible"
            : ""
        }`}
      >
        <ul className={`header__text-container header__text-container_mobile`}>
          {props.userEmail && (
            <li>
              <p className="header__user-email header__user-email_mobile">
                {props.userEmail}
              </p>
            </li>
          )}

          <li>
            <p
              className={`header__link header__link_mobile ${
                props.isLoggedIn
                  ? "header__link_signed-in header__link_signed-in_mobile"
                  : ""
              }`}
              onClick={props.onClick}
            >
              {props.buttonText}
            </p>
          </li>
        </ul>
      </nav>

      <header className="header page__section">
        <img className="header__logo" src={logo} alt="header logo" />

        <nav className="header__nav-menu">
          <img
            className={`header__nav-button button ${
              props.isLoggedIn && "header__nav-button_visible"
            }`}
            src={isDisplayed ? closeIcon : hamburger}
            onClick={displayUserInfo}
            alt="navigation menu"
          />

          <ul
            className={`header__text-container ${
              props.isLoggedIn && "header__text-container_visible"
            }`}
          >
            {props.userEmail && (
              <li>
                <p className="header__user-email">{props.userEmail}</p>
              </li>
            )}

            <li>
              <p
                className={`header__link ${
                  props.isLoggedIn ? "header__link_signed-in" : ""
                }`}
                onClick={props.onClick}
              >
                {props.buttonText}
              </p>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
