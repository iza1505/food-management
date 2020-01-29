import React from "react";
import { bool, func } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import toggle from "../../../components/Fields/toggle";
import MyLoader from "../../../components/Loader/loader.component";
import textarea from "../../../components/Fields/textarea";
import { validateRequired } from "../../Validators/Validators";

const UpdateRecipeStatusModalForm = props => {
  const {
    handleSubmit,
    change,
    isActive,
    isWaitingForAccept,
    fetching,
    t
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="updateRecipeStatusModalForm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="updateRecipeStatusModalForm"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Aktualizuj przepis</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">Zmień status przepisu.</h1>
              <Field
                name="active"
                id="active"
                label={t("label.active")}
                component={toggle}
                onChange={e => {
                  change("waitingForAccept", !e);
                  if (e) {
                    change("toImprove", "");
                  }
                }}
              />
              <Field
                name="waitingForAccept"
                id="waitingForAccept"
                type="checkbox"
                label={t("label.waitingForAccept")}
                component={toggle}
                onChange={e => {
                  if (e) {
                    change("active", !e);
                    change("toImprove", "");
                  }
                }}
              />
              <Field
                className="form-control mb-2 mr-sm-2 textarea-autosize"
                name="toImprove"
                id="toImprove"
                type="text"
                placeholder={t("placeholder.toImprove")}
                label={t("label.toImprove")}
                component={textarea}
                disabled={isActive || isWaitingForAccept}
                validate={
                  (!isWaitingForAccept && isActive) ||
                  (isWaitingForAccept && !isActive)
                    ? []
                    : validateRequired
                }
              />
              <div className="modal-footer">
                <MyLoader visible={fetching} />
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={fetching}
                >
                  {t("button.change")}
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

UpdateRecipeStatusModalForm.propTypes = {
  change: func,
  fetching: bool,
  handleSubmit: func,
  isActive: bool,
  isWaitingForAccept: bool
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "updateRecipeStatusModalForm",
    enableReinitialize: true
  })
)(UpdateRecipeStatusModalForm);
