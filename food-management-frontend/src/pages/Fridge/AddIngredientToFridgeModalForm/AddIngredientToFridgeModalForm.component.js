import React from "react";
import { array, func } from "prop-types";
import { Form, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import { validateRequired, validateInteger } from "../../Validators/Validators";

import select from "../../../components/Fields/select";

const AddIngredientToFridgeModalForm = props => {
  const { handleSubmit, avaliableIngredientsToAddToFridge } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="addIngredientToFridgeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addIngredientToFridgeModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Add ingredient</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">Add ingredient to fridge.</h1>
              <Field
                className="form-control "
                name="ingredient"
                id="ingredient"
                type="text"
                label="Select ingredient"
                validate={[validateRequired]}
                component={select}
                options={avaliableIngredientsToAddToFridge}
              />
              <Field
                className="form-control mb-2 mr-sm-2"
                name="amount"
                id="amount"
                type="number"
                placeholder="Amount"
                label="Amount:"
                validate={[validateInteger]}
                component={input}
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

AddIngredientToFridgeModalForm.propTypes = {
  avaliableIngredientsToAddToFridge: array,
  handleSubmit: func,
  ingredientsOptions: array
};

export default reduxForm({
  form: "addIngredientToFridgeModalForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) =>
    dispatch(reset("addIngredientToFridgeModalForm"))
})(AddIngredientToFridgeModalForm);
