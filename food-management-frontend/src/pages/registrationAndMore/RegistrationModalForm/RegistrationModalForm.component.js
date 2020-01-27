import React from "react";
import { bool, func, string } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";

import input from "../../../components/Fields/input";
import select from "../../../components/Fields/select";
import MyLoader from "../../../components/Loader/loader.component";

import {
  validateRequired,
  validateConfirmedPassword,
  validateEmail,
  validateLogin,
  validatePasswordLength,
  validatePasswordUpperLowerCase,
  validatePasswordDidits
} from "../../Validators/Validators";
import { roleOptionsRegistration } from "../../../configuration/recipeConst";

const RegistrationModalForm = props => {
  const { handleSubmit, userRole, fetching } = props;
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
              <h5>Rejestracja</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Podaj wymagane informacje i utwórz konto.
              </h1>
              {userRole === "ADMINISTRATOR" ? (
                <Field
                  className="form-control"
                  name="role"
                  id="role"
                  type="text"
                  label="Wybierz rolę:"
                  validate={[validateRequired]}
                  component={select}
                  options={roleOptionsRegistration}
                />
              ) : (
                <></>
              )}

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
              <Field
                className="form-control mb-2 mr-sm-2"
                name="password1"
                id="password1"
                placeholder="Hasło"
                label="Hasło:"
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
                placeholder="Potwierdzenie hasła"
                label="Potwierdzenie hasła:"
                validate={[validateRequired, validateConfirmedPassword]}
                type="password"
                component={input}
              />
            </div>

            <div className="modal-footer">
              <MyLoader visible={fetching} />
              <button
                className="btn btn-success"
                type="submit"
                disabled={fetching}
              >
                Utwórz konto
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                disabled={fetching}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

RegistrationModalForm.propTypes = {
  fetching: bool,
  handleSubmit: func,
  userRole: string
};

export default reduxForm({
  form: "registrationModalForm",
  enableReinitialize: true
})(RegistrationModalForm);
