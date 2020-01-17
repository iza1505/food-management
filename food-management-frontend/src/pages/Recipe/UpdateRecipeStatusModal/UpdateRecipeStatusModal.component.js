import React from "react";
import { func, string, object } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import { validateRequired, validateEmail } from "../../Validators/Validators";

const UpdateRecipeStatusModal = props => {
  const { handleSubmit, recipe, ingredients } = props;
  //console.log(JSON.stringify(ingredients));
  //console.log(JSON.stringify(recipe));
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="editRecipeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editRecipeModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit details</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">Edit recipe informations.</h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="email"
                id="email"
                type="text"
                //placeholder={email}
                label="Email:"
                validate={[validateRequired, validateEmail]}
                component={input}
              />
              <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  Update
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

UpdateRecipeStatusModal.propTypes = {
  handleSubmit: func,
  ingredients: object,
  recipe: object
};

export default reduxForm({
  form: "updateRecipeStatusModalForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) =>
    dispatch(reset("updateRecipeStatusModalForm"))
})(UpdateRecipeStatusModal);
