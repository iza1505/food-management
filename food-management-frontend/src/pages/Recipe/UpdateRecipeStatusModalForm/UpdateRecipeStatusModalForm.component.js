import React from "react";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";
import { Form, reduxForm, Field } from "redux-form";

import input from "../../../components/Fields/input";
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
              <h5>Edit details</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">Edit your account details.</h1>
              <Field
                className="mb-2 mr-sm-2"
                name="active"
                id="active"
                type="checkbox"
                label="Active:"
                component="input"
                onClick={e => {
                  change("waitingForAccept", !e.target.checked);

                  if (e.target.checked) {
                    change("toImprove", "");
                  }
                }}
              />
              <Field
                className="mb-2 mr-sm-2"
                name="waitingForAccept"
                id="waitingForAccept"
                type="checkbox"
                //placeholder="To improve"
                label="Waiting for accept"
                component="input"
                //normalize={waitingForAcceptValue}
                onClick={e => {
                  if (e.target.checked) {
                    change("active", !e.target.checked);
                    change("toImprove", "");
                  }
                }}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="toImprove"
                id="toImprove"
                type="text"
                placeholder="To improve"
                label="To improve"
                component={input}
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
