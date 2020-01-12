import React from "react";
import { Link } from "react-router-dom";
import { bool, func, string } from "prop-types";

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
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="usernavmenu"
          >
            <Link to="/profile" className="dropdown-item">
              Profile
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
        <div className="unauth-button-container">
          <nav>
            <a className="btn btn-success" href="/login">
              Log in
            </a>
            <a className="btn btn-success" href="/registrationAndMore">
              Sign in/More..
            </a>
          </nav>
        </div>
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
