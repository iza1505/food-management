import React from "react";
import { reduxForm, Form, Field } from "redux-form";
import { func } from "prop-types";

import { validateRequired } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
//import Input from "../../components/Input/Input.component"; input
//import Button from "../../components/Button/Button.component"; button

//import login from "../../assets/images/login.jpg";
import background from "../../assets/backgroundUnauth.jpg";

export const Login = props => {
  const { handleSubmit } = props;

  return (
    <LayoutMain title="Sign in" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
  
          <Form
            onSubmit={handleSubmit}
            className="form-container"
            autoComplete="on"
          >
            <Field
              className="form-control mb-2 mr-sm-2 autoComplete"
              name="login"
              type="text"
              placeholder="Login"
              validate={validateRequired}
              component={input}
            />
            <Field
              className="form-control mb-2 mr-sm-2"
              name="password"
              placeholder="Password"
              validate={validateRequired}
              type="password"
              component={input}
            />
            <button className="btn btn-success" type="submit">
              {" "}
              Sign in{" "}
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
