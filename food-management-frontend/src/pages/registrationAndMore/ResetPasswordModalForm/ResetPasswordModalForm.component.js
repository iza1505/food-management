import React from "react";
import { bool, func } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";

import input from "../../../components/Fields/input";
import MyLoader from "../../../components/Loader/loader.component";
import {
  validateRequired,
  validateEmail,
  validateLogin
} from "../../Validators/Validators";

const ResetPasswordModalForm = props => {
  const { handleSubmit, fetching } = props;
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
                label="Login:"
                validate={[validateRequired, validateLogin]}
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="email"
                id="email"
                type="text"
                placeholder="Email"
                label="Email:"
                validate={[validateRequired, validateEmail]}
                component={input}
              />

              <div className="modal-footer">
                <MyLoader visible={fetching} />
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={fetching}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  disabled={fetching}
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
  fetching: bool,
  handleSubmit: func
};

export default reduxForm({
  form: "resetPasswordModalForm",
  enableReinitialize: true
})(ResetPasswordModalForm);
