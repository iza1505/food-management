import React from "react";
import { Link } from "react-router-dom";
import { bool, string } from "prop-types";
import { withTranslation } from "react-i18next";

import navigationItems from "../../../../configuration/navigation";

import styles from "./MenuNavigation.module.scss";

const MenuNavigation = ({ loggedStatus, roleActive, t }) => {
  return loggedStatus ? (
    <div className={styles["menu-nav"]}>
      {navigationItems.map((navItem, index) =>
        navItem.canAccess.includes(roleActive) ? (
          <div className={styles["dropdown-menu"]} key={navItem.text}>
            <button
              className={styles["item-toogle"]}
              type="button"
              id={"nav-item-" + index}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {t(navItem.text)}
            </button>

            <div
              className="dropdown-menu"
              aria-labelledby={"nav-item-" + index}
            >
              {navItem.subItems.map(item =>
                item.canAccess.includes(roleActive) ? (
                  <Link to={item.to} className="dropdown-item " key={item.to}>
                    {t(item.text)}
                  </Link>
                ) : null
              )}
            </div>
          </div>
        ) : null
      )}
    </div>
  ) : null;
};

MenuNavigation.propTypes = {
  loggedStatus: bool,
  roleActive: string
};

export default withTranslation("common")(MenuNavigation);
