import React from "react";
import { string } from "prop-types";

import LayoutMain from "../../components/layouts/MainLayout";
import background from "../../assets/background-home.jpg";

export const Home = props => {
  const { login } = props;
  return (
    <LayoutMain title="Home" hideTitle fullContent>
      <div>
        <div
          id="login-screen"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="home-container">
          <h1 className="title-text-home">
            Welcome <br /> {login}{" "}
          </h1>
        </div>
      </div>
    </LayoutMain>
  );
};

Home.propTypes = {
  login: string
};

export default Home;
