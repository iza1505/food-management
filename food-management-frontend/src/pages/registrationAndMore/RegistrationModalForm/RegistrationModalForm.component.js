import React from "react";
import { func } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import {
  validateRequired,
  validateConfirmedPassword,
  validateEmail,
  validateLogin,
  validatePasswordLength,
  validatePasswordUpperLowerCase,
  validatePasswordDidits
} from "../../Validators/Validators";

const RegistrationModalForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="registrationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registrationModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Registration</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Type required information and sign in.
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="loginSignIn"
                id="loginSignIn"
                type="text"
                placeholder="Login"
                validate={[validateRequired, validateLogin]}
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="emailSignIn"
                id="emailSignIn"
                type="text"
                placeholder="Email"
                validate={[validateRequired, validateEmail]}
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="password1"
                id="password"
                placeholder="Password"
                validate={[
                  validateRequired,
                  validatePasswordLength,
                  validatePasswordUpperLowerCase,
                  validatePasswordDidits
                ]}
                type="password"
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Repeat password"
                validate={[validateRequired, validateConfirmedPassword]}
                type="password"
                component={input}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-success" type="submit">
                Sign in
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

RegistrationModalForm.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "registrationModalForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) =>
    dispatch(reset("registrationModalForm"))
})(RegistrationModalForm);
