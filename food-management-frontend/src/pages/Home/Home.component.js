import React from "react";
import { string } from "prop-types";
import { withTranslation } from "react-i18next";

import LayoutMain from "../../components/layouts/MainLayout";
import background from "../../assets/background-home.jpg";

export const Home = props => {
  const { login, t } = props;
  return (
    <LayoutMain title="Strona główna" hideTitle fullContent>
      <div>
        <div
          id="login-screen"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="home-container">
          <h1 className="title-text-home">
            {t("welcomeTitle")}
            <br /> {login}{" "}
          </h1>
        </div>
      </div>
    </LayoutMain>
  );
};

Home.propTypes = {
  login: string
};

export default withTranslation("common")(Home);
