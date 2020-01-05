import React from "react";
import { Link } from "react-router-dom";
import { bool, func, string } from "prop-types";

import ProfileDropdown from "./ProfileDropdown/ProfileDropdown.component";
import MenuNavigation from "./MenuNavigation/MenuNavigation.component";

//import sitelogo from "../../../../assets/images/sitelogo.png";
import styles from "./Header.module.scss";

const Header = ({ loggedStatus, logout, login, roleActive }) => {
    console.log("status");
    console.log(loggedStatus);
    console.log(login);
  return (
    <header className={styles.header}>
      <div className="h-100 d-flex no-gutters justify-content-between align-items-center">
        <div className="mr-5 mr-md-0 align-items-center d-flex">
          <Link to="/" title="Food management">
            {/* <img
              src={sitelogo}
              className="d-block mh-100 mw-100 site-logo"
              alt="Food management"
            /> */}
            Text
          </Link>
        </div>
        <MenuNavigation loggedStatus={loggedStatus} roleActive={roleActive} />
        <ProfileDropdown
          loggedStatus={loggedStatus}
          logout={logout}
          login={login}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  loggedStatus: bool,
  login: string,
  logout: func,
  roleActive: string
};

export default Header;
