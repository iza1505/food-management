import React from "react";
import { reduxForm, Form, Field } from "redux-form";
import { func } from "prop-types";

import { validateRequired } from "./../Validators/Validators";
import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import background from "../../assets/backgroundUnauth.jpg";

export const RegistrationAndMore = props => {
  // const { handleSubmitSignIn, handleSubmitSendEmail } = props;
  const { handleSubmit } = props;
  return (
    <LayoutMain title="Sign in" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${background})` }}>
        <Form
          onSubmit={handleSubmit}
          className="form-container"
          autoComplete="on"
        >
          <h1 className="email-information">
            Type required information and sign in.
          </h1>
          <Field
            className="form-control mb-2 mr-sm-2 autoComplete"
            name="login"
            type="text"
            placeholder="Login"
            validate={validateRequired}
            component={input}
          />
          <Field
            className="form-control mb-2 mr-sm-2 autoComplete"
            name="emailSignIn"
            type="text"
            placeholder="Email"
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
          <Field
            className="form-control mb-2 mr-sm-2"
            name="passwordConfirm"
            placeholder="Repeat password"
            validate={validateRequired}
            type="password"
            component={input}
          />
          <button className="btn btn-success" type="submit">
            {" "}
            Sign in{" "}
          </button>
        </Form>
{/* 
        <Form
          onSubmit={handleSubmitSendEmail}
          className="form-container"
          autoComplete="on"
        >
          <div className="email-container">
            <h1 className="email-information">
              Type your email and choose one of two options.{" "}
            </h1>
            <Field
              className="form-control mb-2 mr-sm-2 autoComplete"
              name="email"
              type="text"
              placeholder="Email"
              validate={validateRequired}
              component={input}
            />

            <button
              className="btn btn-success"
              type="submit"
              name="confirmation"
            >
              Confirmation email
            </button>
            <button className="btn btn-success" type="submit" name="reset">
              Reset password
            </button>
          </div>
        </Form> */}
      </div>
    </LayoutMain>
  );
};

RegistrationAndMore.propTypes = {
  handleSubmit: func,
  //handleSubmitSendEmail: func
};

export default reduxForm({
  form: "registrationform"
})(RegistrationAndMore);
