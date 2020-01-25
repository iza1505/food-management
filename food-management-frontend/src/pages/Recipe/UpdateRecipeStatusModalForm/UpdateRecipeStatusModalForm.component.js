import React from "react";
import { bool, func } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";

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
    fetching
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
              <h5>Update recipe</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">Update recipe status.</h1>
              <Field
                name="active"
                id="active"
                label="Active:"
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
                label="Waiting for accept:"
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
                placeholder="To improve:"
                label="To improve"
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
                  Send
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

UpdateRecipeStatusModalForm.propTypes = {
  change: func,
  fetching: bool,
  handleSubmit: func,
  isActive: bool,
  isWaitingForAccept: bool
};

export default reduxForm({
  form: "updateRecipeStatusModalForm",
  enableReinitialize: true
})(UpdateRecipeStatusModalForm);
