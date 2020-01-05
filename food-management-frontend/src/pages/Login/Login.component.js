import React from "react";
import { reduxForm, Form } from "redux-form";
import { func, string, bool } from "prop-types";

//import { validateRequired } from "../../validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
//import Input from "../../components/Input/Input.component"; input
//import Button from "../../components/Button/Button.component"; button

//import login from "../../assets/images/login.jpg";
import background from "../../assets/background.jpg";

export const Login = props => {
  const { handleSubmit, errors } = props;

  return (
    <LayoutMain title="Sign in" hideTitle fullContent >
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <div className="login-container">
          <Form onSubmit={handleSubmit} className="form-container">
            <span style={{ color: "red" }}>{errors}</span>
            <input
              name="login"
              placeholder="Username"
              label="Login *"
              //validate={validateRequired}
              component="input"
            />
            <input
              name="password"
              placeholder="Password"
              label="Password *"
              //validate={validateRequired}
              type="password"
              component="input"
            />
            <button type="submit" text="sign in" />
          </Form>
        </div>
      </div>
    </LayoutMain>
  );
};

Login.propTypes = {
  handleSubmit: func,
  errors: string,
  submitting: bool
};

export default reduxForm({
  form: "loginform"
})(Login);
