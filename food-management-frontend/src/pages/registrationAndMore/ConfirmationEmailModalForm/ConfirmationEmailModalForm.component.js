import React from "react";
import { bool, func } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import input from "../../../components/Fields/input";
import MyLoader from "../../../components/Loader/loader.component";
import {
  validateRequired,
  validateEmail,
  validateLogin
} from "../../Validators/Validators";

const ConfirmationEmailModalForm = props => {
  const { handleSubmit, fetching, t } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="confirmationEmailModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmationEmailModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Email aktywacyjny</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Podaj wymagane informacje aby wysłać email aktywujący konto.
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="login"
                id="login"
                type="text"
                placeholder={t("placeholder.login")}
                label={t("label.login")}
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
                  {t("button.send")}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  disabled={fetching}
                >
                  {t("button.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

ConfirmationEmailModalForm.propTypes = {
  fetching: bool,
  handleSubmit: func
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "confirmationEmailModalForm",
    enableReinitialize: true
  })
)(ConfirmationEmailModalForm);
