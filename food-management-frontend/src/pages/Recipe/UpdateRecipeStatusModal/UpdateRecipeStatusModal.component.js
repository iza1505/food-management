import React from "react";
import { array, func, object } from "prop-types";
import { Form, FieldArray, reduxForm, reset, Field } from "redux-form";

import input from "../../../components/Fields/input";
import select from "../../../components/Fields/select";
import MySelect from "../../../components/Fields/MySelect";
import recipeSelect from "../../../components/Fields/recipeSelect";
import { validateRequired } from "../../Validators/Validators";

const AddIngredientToRecipeModal = props => {
  const {
    handleSubmit,
    handleAddIngredient,
    initialValues,
    ingredientsOptions
  } = props;

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
              <h5> Add ingredient </h5>
            </div>
            <div className="modal-body">
              <h1 className="email-information">
                Choose ingredient from list and type amount
              </h1>
              <div className="d-flex bd-highlight mb-3">
                <Field
                  className="form-control mb-2 mr-sm-4"
                  name="addIngredientToRecipe"
                  type="text"
                  label="New ingredient:"
                  component={select}
                  options={ingredientsOptions}
                />
                <Field
                  className="p-2 bd-highlight"
                  type="text"
                  component={input}
                  label="Amount"
                />
                <button
                  type="button"
                  title="Add ingredient"
                  className="btn btn-success ml-auto p-2 bd-highlight"
                  onClick={values => handleAddIngredient(values)}
                >
                  Add ingredient
                </button>
              </div>
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

const renderMembers = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"
        />
        <button
          type="button"
          title="Remove ingredient"
          onClick={() => fields.remove(index)}
        />
      </li>
    ))}
  </ul>
);

AddIngredientToRecipeModal.propTypes = {
  initialValues: object,
  handleAddIngredient: func,
  handleSubmit: func,
  ingredientsOptions: array
};

export default reduxForm({
  form: "addIngredientToRecipeModalForm",
  enableReinitialize: true
  //keepDirtyOnReinitialize: true,
  //   onSubmitSuccess: (result, dispatch) =>
  //     dispatch(reset("updateRecipeStatusModalForm"))
})(AddIngredientToRecipeModal);
