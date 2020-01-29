import React from "react";
import { withTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import styles from "./Footer.module.scss";

function switchLang(lang) {
  // i18n
  //   .use(initReactI18next) // passes i18n down to react-i18next
  //   .init({ lng: lang });
    i18n.locale='pl';
}

const Footer = props => {
  const { i18n } = props;
  //console.log(JSON.stringify(i18n));
  return (
    <footer className={[styles.footer]}>
      <div className="d-flex justify-content-center">
        <div>
          <button
            className="btn btn-link"
            onClick={() =>
              switchLang("pl")
            }
          >
            Polski
          </button>
          2020 &copy; Food management
          <button className="btn btn-link" onClick={() => switchLang("en")}>
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
