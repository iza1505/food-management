import React from "react";
import { func } from "prop-types";
import { reduxForm, Form, Field } from "redux-form";

import {
  validateRequired,
  validateConfirmedPassword
} from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import background from "../../assets/backgroundUnauth.jpg";

export const ChangePasswordMail = props => {
  const { handleSubmit } = props;

  return (
    <LayoutMain title="Password change" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <Form
          onSubmit={handleSubmit}
          className="form-container"
          autoComplete="on"
        >
          <div className="email-container">
            <h1 className="email-information">Type new password. </h1>
            <Field
              className="form-control mb-2 mr-sm-2 autoComplete"
              name="password1"
              type="password"
              placeholder="Password"
              label="Password:"
              validate={validateRequired}
              component={input}
            />
            <Field
              className="form-control mb-2 mr-sm-2 autoComplete"
              name="password2"
              type="password"
              placeholder="Password confirmation"
              label="Password confirmation:"
              validate={validateConfirmedPassword}
              component={input}
            />
            <button
              className="btn btn-success"
              type="submit"
              name="changePassword"
            >
              Change password
            </button>
          </div>
        </Form>
      </div>
    </LayoutMain>
  );
};

ChangePasswordMail.propTypes = {
  handleSubmit: func
};
export default reduxForm({
  form: "changePasswordForm"
})(ChangePasswordMail);
