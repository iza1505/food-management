import React from "react";
import { array, bool, object, oneOfType, string } from "prop-types";

import Header from "./../Header";
import Footer from "./../Footer/Footer.component";

import styles from "./MainLayout.module.scss";

const MainLayout = ({
  children,
  title,
  fullContent,
  hideTitle,
}) => {
  return (
    <div>
      <Header />
      <main
        className={[
          styles["main-content"],
          fullContent ? styles["full-content"] : ""
        ].join(" ")}
      >
        {title && !hideTitle ? (
          <div className={styles["page-header"]}>
            <h4 className="layout-title">{title}</h4>
          </div>
        ) : null}
        <section>{children}</section>
      </main>
      <Footer />
    </div>
  );
};

MainLayout.defaultProps = {
  buttons: null,
  buttonsHide: false,
  title: "",
  fullContent: false,
  hideTitle: false
};

MainLayout.propTypes = {
  buttons: oneOfType([array, object]),
  buttonsHide: bool,
  children: object.isRequired,
  fullContent: bool,
  hideTitle: bool,
  title: string
};

export default MainLayout;
