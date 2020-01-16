import React from "react";
import { reduxForm, Form, Field } from "redux-form";
import { func } from "prop-types";

import { validateRequired } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import background from "../../assets/backgroundUnauth.jpg";

export const Login = props => {
  const { handleSubmit } = props;

  return (
    <LayoutMain title="Log in" hideTitle fullContent>
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
            placeholder="Password"
            label="Password:"
            validate={validateRequired}
            type="password"
            component={input}
          />
          <button className="btn btn-success" type="submit">
            {" "}
            Log in{" "}
          </button>
        </Form>
      </div>
    </LayoutMain>
  );
};

Login.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "loginform"
})(Login);
