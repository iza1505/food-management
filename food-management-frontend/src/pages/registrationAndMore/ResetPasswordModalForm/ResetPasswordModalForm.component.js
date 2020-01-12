import React from "react";
import { func } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import {
  validateRequired,
  validateEmail,
  validateLogin
} from "../../Validators/Validators";

const ResetPasswordModalForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="resetPasswordModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="resetPasswordModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Reset password</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Type required information and send reset password email.
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="login"
                id="login"
                type="text"
                placeholder="Login"
                validate={[validateRequired, validateLogin]}
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="email"
                id="email"
                type="text"
                placeholder="Email"
                validate={[validateRequired, validateEmail]}
                component={input}
              />

              <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  Reset
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
      </div>
    </Form>
  );
};

ResetPasswordModalForm.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "resetPasswordModalForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) =>
    dispatch(reset("resetPasswordModalForm"))
})(ResetPasswordModalForm);
