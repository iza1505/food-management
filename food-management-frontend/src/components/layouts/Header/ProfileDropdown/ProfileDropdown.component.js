import React from "react";
import { Link } from "react-router-dom";
import { bool, func, string } from "prop-types";

//import ButtonLink from "../../../../../ButtonLink/ButtonLink.component";

import styles from "./ProfileDropdown.module.scss";

const ProfileDropdown = ({ loggedStatus, logout, login }) => {
  return (
    <div className={styles["navaccount"]}>
      {loggedStatus ? (
        <div className="dropdown">
          <button
            className={styles["usernav-toogle"]}
            type="button"
            id="usernavmenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <span>{login}</span>
          </button>
          <div className="dropdown-menu" aria-labelledby="usernavmenu">
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
            <Link to="/profile/settings" className="dropdown-item">
              Settings
            </Link>
            <hr />
            <li
              className={[styles["logout-item"], "dropdown-item"].join(" ")}
              onClick={logout}
            >
              Logout
            </li>
          </div>
        </div>
      ) : (
        <a href="/login" text="sign in" style={{color: 'blue'}}> sing in </a>
      )}
    </div>
  );
};

ProfileDropdown.propTypes = {
  loggedStatus: bool,
  login: string,
  logout: func
};

export default ProfileDropdown;
