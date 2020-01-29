import React from "react";
import { func, string } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import input from "../../../components/Fields/input";
import { validateRequired, validateEmail } from "../../Validators/Validators";

const EditDetailsModalForm = props => {
  const { handleSubmit, email, t } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="editDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editDetailsModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{t("modal.title.editUser")}</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                {t("modal.description.editUser")}
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="email"
                id="email"
                type="text"
                placeholder={email}
                label="Email:"
                validate={[validateRequired, validateEmail]}
                component={input}
              />
              <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  {t("button.send")}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
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

EditDetailsModalForm.propTypes = {
  email: string,
  handleSubmit: func
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "editDetailsModalForm",
    enableReinitialize: true,
    onSubmitSuccess: (result, dispatch) =>
      dispatch(reset("editDetailsModalForm"))
  })
)(EditDetailsModalForm);
