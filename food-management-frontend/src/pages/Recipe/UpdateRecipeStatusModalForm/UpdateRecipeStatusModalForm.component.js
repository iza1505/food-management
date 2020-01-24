import React from "react";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";

import toggle from "../../../components/Fields/toggle";
import textarea from "../../../components/Fields/textarea";
import { validateRequired } from "../../Validators/Validators";

const UpdateRecipeStatusModalForm = props => {
  const { handleSubmit, change, isActive, isWaitingForAccept } = props;
  console.log("is active: " + JSON.stringify(isActive));
  //console.log("field val " + JSON.stringify(activeFieldValue));
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
                <button className="btn btn-success" type="submit">
                  Send
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

UpdateRecipeStatusModalForm.propTypes = {
  change: func,
  handleSubmit: func,
  isActive: bool,
  isWaitingForAccept: bool
};

export default reduxForm({
  form: "updateRecipeStatusModalForm",
  enableReinitialize: true
  // onSubmitSuccess: (result, dispatch) =>
  //   dispatch(reset("updateRecipeStatusModalForm"))
})(UpdateRecipeStatusModalForm);
