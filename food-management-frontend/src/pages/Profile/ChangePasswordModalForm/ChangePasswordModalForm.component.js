import React from "react";
import { func } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import {
  validateRequired,
  validatePasswordLength,
  validatePasswordUpperLowerCase,
  validatePasswordDidits,
  validateConfirmedPassword
} from "../../Validators/Validators";

const ChangePasswordModalForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="changePasswordModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Change password</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Type old password and new password to change.
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="oldPassword"
                id="oldPassword"
                type="password"
                placeholder="Old Password"
                label="Old Password:"
                validate={[validateRequired]}
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="password1"
                id="password1"
                type="password"
                placeholder="New Password"
                label="New Password:"
                validate={[
                  validateRequired,
                  validatePasswordLength,
                  validatePasswordUpperLowerCase,
                  validatePasswordDidits
                ]}
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="passwordConfirm"
                id="passwordConfirm"
                type="password"
                placeholder="Confirm new password"
                label="Confirm new password:"
                validate={[validateRequired, validateConfirmedPassword]}
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

ChangePasswordModalForm.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "changePasswordModalForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) =>
    dispatch(reset("changePasswordModalForm"))
})(ChangePasswordModalForm);
