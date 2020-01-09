import React from "react";
import { string } from "prop-types";

import LayoutMain from "../../components/layouts/MainLayout";
import background from "../../assets/backgroundUnauth.jpg";

export const ConfirmedEmail = props => {
  const { information } = props;

  return (
    <LayoutMain title="Email confirmation" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <h1 className="email-information">
          {information}
        </h1>
      </div>
    </LayoutMain>
  );
};

ConfirmedEmail.propTypes = {
    information: string
};

export default ConfirmedEmail;
