import React from "react";
import { array, func, object } from "prop-types";
import { Form, FieldArray, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import select from "../../../components/Fields/select";
import MySelect from "../../../components/Fields/MySelect";
import recipeSelect from "../../../components/Fields/recipeSelect";
import { validateRequired } from "../../Validators/Validators";
import ingredientLabel from "../../../components/Fields/ingredientLabel";

const AddIngredientModalForm = props => {
  const { handleAddIngredient, ingredientsOptions } = props;
  //console.log(JSON.stringify(ingredientsOptions));
  return (
    <Form formKey="addIngr">
      <div
        className="modal fade"
        id="addIngredientModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addIngredientModal"
        aria-hidden="true"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Ingredient</h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Add ingredient. If you want change amount of exists ingredient
                on recipe list add it as new one.
              </h1>
              <div className="d-flex bd-highlight mb-3">
                <Field
                  className="form-control mb-2 mr-sm-2"
                  name="ingredientId"
                  type="text"
                  label="Ingredient:"
                  component={select}
                  options={ingredientsOptions}
                />
                <Field
                  className="form-control mb-2 mr-sm-2"
                  name="ingredientAmount"
                  type="text"
                  component={input}
                  placeholder="Amount"
                  label="Amount"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  type="button"
                  data-dismiss="modal"
                  onClick={e => handleAddIngredient(e)}
                >
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

AddIngredientModalForm.propTypes = {
  handleAddIngredient: func,
  ingredientsOptions: array
};

export default reduxForm({
  form: "addIngredientModalForm",
  enableReinitialize: true
  //keepDirtyOnReinitialize: true,
  //   onSubmitSuccess: (result, dispatch) =>
  //     dispatch(reset("updateRecipeStatusModalForm"))
})(AddIngredientModalForm);
