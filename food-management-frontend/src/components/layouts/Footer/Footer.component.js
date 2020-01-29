import React from "react";
import { withTranslation } from "react-i18next";

import styles from "./Footer.module.scss";

const Footer = props => {
  const { i18n } = props;
  //console.log(JSON.stringify(i18n));
  return (
    <footer className={[styles.footer]}>
      <div className="d-flex justify-content-center">
        <div>
          <button
            className="btn btn-link"
            onClick={() => i18n.changeLanguage("pl")}
          >
            Polski
          </button>
          2020 &copy; Food management
          <button
            className="btn btn-link"
            onClick={() => i18n.changeLanguage("en")}
          >
            English
          </button>
        </div>
      </div>
      {/* <div className="d-flex justify-content-between">
        <div className="">2020 &copy; Food management</div>

        <div className="">
          <button
            className="btn btn-link"
            onClick={() => i18n.changeLanguage("pl")}
          >
            Polski
          </button>
          <button
            className="btn btn-link"
            onClick={() => i18n.changeLanguage("en")}
          >
            English
          </button>
        </div>
      </div> */}
    </footer>
  );
};

export default withTranslation("common")(Footer);
//export default Footer;
