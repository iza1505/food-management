import React from "react";
import { withTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import styles from "./Footer.module.scss";

function changeLang(lang) {
  i18n.use(initReactI18next).init({ lng: lang });
}

const Footer = props => {
  return (
    <footer className={[styles.footer]}>
      <div className="d-flex justify-content-center">
        <div>
          <button className="btn btn-link" onClick={() => changeLang("pl")}>
            Polski
          </button>
          2020 &copy; Food management
          <button className="btn btn-link" onClick={() => changeLang("en")}>
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
