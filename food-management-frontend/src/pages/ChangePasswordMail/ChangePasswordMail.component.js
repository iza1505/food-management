import React from "react";
import { bool, func } from "prop-types";
import { reduxForm, Form, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import {
  validateRequired,
  validateConfirmedPassword
} from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import MyLoader from "../../components/Loader/loader.component";
import background from "../../assets/backgroundUnauth.jpg";

export const ChangePasswordMail = props => {
  const { handleSubmit, fetching, t } = props;

  return (
    <LayoutMain title={t("pageTitle.resetPassword")} hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <Form
          onSubmit={handleSubmit}
          className="form-container"
          autoComplete="on"
        >
          <h1 className="email-information">
            {t("modal.description.resetPasswordInformation")}
          </h1>
          <Field
            className="form-control mb-2 mr-sm-2 autoComplete"
            name="password1"
            type="password"
            placeholder={t("placeholder.password")}
            label={t("label.password")}
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2 autoComplete"
            name="password2"
            type="password"
            placeholder={t("placeholder.confirmPassword")}
            label={t("label.confirmPassword")}
            validate={validateConfirmedPassword}
            component={input}
          />
          <button
            className="btn btn-success"
            type="submit"
            name="changePassword"
            disabled={fetching}
          >
            {t("button.resetPassword")}
          </button>
          <MyLoader visible={fetching} />
        </Form>
      </div>
    </LayoutMain>
  );
};

ChangePasswordMail.propTypes = {
  fetching: bool,
  handleSubmit: func
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "changePasswordForm"
  })
)(ChangePasswordMail);
