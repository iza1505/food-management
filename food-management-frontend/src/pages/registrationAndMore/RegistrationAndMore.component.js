import React from "react";
import { reduxForm } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import LayoutMain from "../../components/layouts/MainLayout";
import background from "../../assets/backgroundUnauth.jpg";
import RegistrationModalForm from "./RegistrationModalForm";
import ResetPasswordModalForm from "./ResetPasswordModalForm";
import ConfirmationEmailModalForm from "./ConfirmationEmailModalForm";

export const RegistrationAndMore = ({ t }) => {
  return (
    <LayoutMain title="Dołącz | Więcej" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#registrationModal"
          text="Registration"
        >
          {t("button.registration")}
        </button>
        <RegistrationModalForm />
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#resetPasswordModal"
          text="Reset password"
          style={{
            marginLeft: "5px"
          }}
        >
          {t("button.resetPassword")}
        </button>
        <ResetPasswordModalForm />
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#confirmationEmailModal"
          text="Reset password"
          style={{
            marginLeft: "5px"
          }}
        >
          {t("button.sendConfirmMail")}
        </button>
        <ConfirmationEmailModalForm />
      </div>
    </LayoutMain>
  );
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "registrationform"
  })
)(RegistrationAndMore);
