import React from "react";
import { Link } from "react-router-dom";
import { bool, string } from "prop-types";

import navigationItems from "../../../../configuration/navigation";

import styles from "./MenuNavigation.module.scss";

const MenuNavigation = ({ loggedStatus, roleActive }) => {
  // console.log("status");
  // console.log(loggedStatus);
  return loggedStatus ? (
    <div className={styles["menu-nav"]}>
      {navigationItems.map((navItem, index) => (
        navItem.canAccess.includes(roleActive) ? 
        (<div className={styles["dropdown-menu"]} key={navItem.text}>
          <button
            className={styles["item-toogle"]}
            type="button"
            id={"nav-item-" + index}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {navItem.text}
          </button>

          <div className="dropdown-menu" aria-labelledby={"nav-item-" + index} >
            {navItem.subItems.map(item =>
              item.canAccess.includes(roleActive) ? (
                <Link to={item.to} className="dropdown-item " key={item.to}>
                  {item.text}
                </Link>
              ) : null
            )}
          </div>

        </div>) : null
      ))}
    </div>
  ) : null;
};

MenuNavigation.propTypes = {
  loggedStatus: bool,
  roleActive: string
};

export default MenuNavigation;
