import React from "react";
import { array, bool, number, func, string } from "prop-types";
import { reduxForm, Field } from "redux-form";

import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
// import AddIngredientToFridge from "./AddIngredientToFridge";
// import IngredientProposition from "./IngredientProposition";

export const Fridge = props => {
  const {
    fetchingIngredients,
    ingredients,
    handleDeleteIngredient,
    handleSaveChangesIngredient
  } = props;

  let ingredientSizeHalf = (ingredients.length / 2).toFixed();

  return (
    <LayoutMain title="My fridge">
      <div className="">
        <div className="row">
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#addIngredientToFridgeModal"
            text="Edit details"
          >
            Add ingredient to fridge
          </button>
          {/* <AddIngredientToFridge /> */}
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#addIngredientToFridgeModal"
            text="Edit details"
          >
            Suggest a new ingredient
          </button>
          {/* <IngredientProposition /> */}
          <div className="col-sm">
            {
              <table className="table table-striped ">
                <thead className="bg-success">
                  <tr>
                    <th scope="col">Ingredient</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients &&
                    ingredients.slice(0, ingredientSizeHalf).map(elem => (
                      <tr key={elem.ingredient.id}>
                        <th scope="row">
                          {elem.ingredient.measure.measureName ? (
                            <>
                              {elem.ingredient.ingredientName +
                                " (" +
                                elem.ingredient.measure.measureName +
                                ")"}
                            </>
                          ) : (
                            <>{elem.ingredient.ingredientName}</>
                          )}
                        </th>
                        <td>
                          <input
                            name={elem.ingredient.id}
                            type="number"
                            className="form-control"
                            onBlur={e => handleSaveChangesIngredient(e)}
                            defaultValue={elem.amount}
                            disabled={!fetchingIngredients}
                          />
                        </td>
                        <td>
                          <span className="table-remove">
                            <button
                              disabled={!fetchingIngredients}
                              type="button"
                              className="btn btn-danger btn-rounded btn-sm my-0"
                              onClick={() =>
                                handleDeleteIngredient(elem.ingredient.id)
                              }
                            >
                              Remove
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            }
          </div>
          <div className="col-sm">
            {
              <table className="table table-striped ">
                <thead className="bg-success">
                  <tr>
                    <th scope="col">Ingredient</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients &&
                    ingredients
                      .slice(ingredientSizeHalf, ingredients.length)
                      .map(elem => (
                        <tr key={elem.ingredient.id}>
                          <th scope="row">
                            {elem.ingredient.measure.measureName ? (
                              <>
                                {elem.ingredient.ingredientName +
                                  " (" +
                                  elem.ingredient.measure.measureName +
                                  ")"}
                              </>
                            ) : (
                              <>{elem.ingredient.ingredientName}</>
                            )}
                          </th>
                          <td>
                            <input
                              name={elem.ingredient.id}
                              type="number"
                              className="form-control"
                              onBlur={e => handleSaveChangesIngredient(e)}
                              defaultValue={elem.amount}
                            />
                          </td>
                          <td>
                            <span className="table-remove">
                              <button
                                type="button"
                                className="btn btn-danger btn-rounded btn-sm my-0"
                                onClick={() =>
                                  handleDeleteIngredient(elem.ingredient.id)
                                }
                              >
                                Remove
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </LayoutMain>
  );
};

Fridge.propTypes = {
  fetchingIngredients: bool,
  handleDeleteIngredient: func,
  handleSaveChangesIngredient: func,
  ingredients: array
};

export default reduxForm({
  form: "fridgeForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Fridge);
//export default HeadersUser;
