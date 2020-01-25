import React from "react";
import { reduxForm, Form, Field } from "redux-form";
import { bool, func } from "prop-types";

import { validateRequired } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import MyLoader from "../../components/Loader/loader.component";
import background from "../../assets/backgroundUnauth.jpg";

export const Login = props => {
  const { handleSubmit, fetching } = props;

  return (
    <LayoutMain title="Logowanie" hideTitle fullContent>
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
            placeholder="Login"
            label="Login:"
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2"
            name="password"
            placeholder="Hasło"
            label="Hasło:"
            validate={validateRequired}
            type="password"
            component={input}
          />

          <button className="btn btn-success" type="submit" disabled={fetching}>
            {" "}
            Zaloguj{" "}
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

export default reduxForm({
  form: "loginform"
})(Login);
