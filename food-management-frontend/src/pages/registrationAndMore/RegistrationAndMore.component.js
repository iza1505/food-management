import React from "react";
import { reduxForm } from "redux-form";

import LayoutMain from "../../components/layouts/MainLayout";
import background from "../../assets/backgroundUnauth.jpg";
import RegistrationModalForm from "./RegistrationModalForm";
import ResetPasswordModalForm from "./ResetPasswordModalForm";
import ConfirmationEmailModalForm from "./ConfirmationEmailModalForm";

export const RegistrationAndMore = props => {
  return (
    <LayoutMain title="Sign in" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#registrationModal"
          text="Registration"
        >
          Registration
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
          Reset password
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
          Confirmation account email
        </button>
        <ConfirmationEmailModalForm />
      </div>
    </LayoutMain>
  );
};

export default reduxForm({
  form: "registrationform"
})(RegistrationAndMore);
