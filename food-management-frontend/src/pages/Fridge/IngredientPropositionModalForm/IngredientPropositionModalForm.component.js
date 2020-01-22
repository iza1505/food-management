import React from "react";
import { array, func, string } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import select from "../../../components/Fields/select";
import { userRoles } from "../../../configuration/roles";
import { validateRequired } from "../../Validators/Validators";

const IngredientPropositionModalForm = props => {
  const { handleSubmit, userRole, measures } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="ingredientPropositionModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ingredientPropositionModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Add ingredient</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                {userRole && userRole === userRoles.user ? (
                  <>Suggest a new ingredient.</>
                ) : (
                  <>Add a new ingredient.</>
                )}
              </h1>
              <Field
                className="form-control mb-2 mr-sm-2"
                name="ingredientName"
                id="ingredientName"
                type="text"
                placeholder="Ingredient name:"
                label="Ingredient name:"
                validate={validateRequired}
                component={input}
              />
              <Field
                className="form-control "
                name="measure"
                id="measure"
                type="text"
                label="Select measure type:"
                validate={validateRequired}
                component={select}
                options={measures}
              />

              <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  Add
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

IngredientPropositionModalForm.propTypes = {
  handleSubmit: func,
  measures: array,
  userRole: string
};

export default reduxForm({
  form: "ingredientPropositionModalForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) =>
    dispatch(reset("ingredientPropositionModalForm"))
})(IngredientPropositionModalForm);
