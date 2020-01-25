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
              <h5>Zmień hasło</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Zmień hasło podając stare i nowe spełniające wymagane kryteria.
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="oldPassword"
                id="oldPassword"
                type="password"
                placeholder="Stare hasło"
                label="Stare hasło:"
                validate={[validateRequired]}
                component={input}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="password1"
                id="password1"
                type="password"
                placeholder="Nowe hasło"
                label="Nowe hasło:"
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
                placeholder="Nowe hasło"
                label="Potwierdź nowe hasło:"
                validate={[validateRequired, validateConfirmedPassword]}
                component={input}
              />

              <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  Zmień
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Zamknij
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
