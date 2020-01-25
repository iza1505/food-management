import React from "react";
import { bool, func } from "prop-types";
import { reduxForm, Form, Field } from "redux-form";

import {
  validateRequired,
  validateConfirmedPassword
} from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import MyLoader from "../../components/Loader/loader.component";
import background from "../../assets/backgroundUnauth.jpg";

export const ChangePasswordMail = props => {
  const { handleSubmit, fetching } = props;

  return (
    <LayoutMain title="Resetowanie hasła" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <Form
          onSubmit={handleSubmit}
          className="form-container"
          autoComplete="on"
        >
          <h1 className="email-information">Podaj nowe hasło. </h1>
          <Field
            className="form-control mb-2 mr-sm-2 autoComplete"
            name="password1"
            type="password"
            placeholder="Hasło"
            label="Hasło:"
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2 autoComplete"
            name="password2"
            type="password"
            placeholder="Potwierdzenie hasła"
            label="Potwierdzenie hasła:"
            validate={validateConfirmedPassword}
            component={input}
          />
          <button
            className="btn btn-success"
            type="submit"
            name="changePassword"
            disabled={fetching}
          >
            Resetuj hasło
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
export default reduxForm({
  form: "changePasswordForm"
})(ChangePasswordMail);
