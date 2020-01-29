import React from "react";
import { reduxForm, Form, Field } from "redux-form";
import { bool, func } from "prop-types";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import { validateRequired } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import MyLoader from "../../components/Loader/loader.component";
import background from "../../assets/backgroundUnauth.jpg";

export const Login = props => {
  const { handleSubmit, fetching, t } = props;

  return (
    <LayoutMain title={t("pageTitle.login")} hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <Form
          onSubmit={handleSubmit}
          className="form-container"
          autoComplete="on"
        >
          <Field
            className="form-control mb-2 mr-sm-2"
            name="login"
            type="text"
            placeholder={t("placeholder.login")}
            label={t("label.login")}
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2"
            name="password"
            placeholder={t("placeholder.password")}
            label={t("label.password")}
            validate={validateRequired}
            type="password"
            component={input}
          />

          <button className="btn btn-success" type="submit" disabled={fetching}>
            {t("button.login")}
          </button>
          <MyLoader visible={fetching} />
        </Form>
      </div>
    </LayoutMain>
  );
};

Login.propTypes = {
  fetching: bool,
  handleSubmit: func
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "loginform"
  })
)(Login);
