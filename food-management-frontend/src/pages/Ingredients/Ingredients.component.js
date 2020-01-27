import React from "react";
import { array, bool, number, func } from "prop-types";
import { reduxForm, Field } from "redux-form";

import {
  elementsOnPageOptions,
  sortByOptionsIngredient,
  ascendingSortOptions
} from "../../configuration/recipeConst";

import LayoutMain from "../../components/layouts/MainLayout";
import input from "../../components/Fields/input";
import select from "../../components/Fields/select";
import Pagination from "../../components/Pagination/Pagination";
import { renderBooelan } from "../../configuration/helpers";
import IngredientProposition from "../Fridge/IngredientPropositionModalForm";

export const Ingredients = props => {
  const {
    pageCount,
    ingredients,
    currentPage,
    fetching,
    handleActiveIngredient,
    handleDeleteIngredient,
    handlePagination,
    paginationElem,
    handleClick
  } = props;

  return (
    <LayoutMain title="Produkty">
      <div>
        <div className="center-align-elem">
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#ingredientPropositionModal"
            text="Edit details"
            style={{
              marginLeft: "5px"
            }}
          >
            Dodaj nowy produkt
          </button>
          <IngredientProposition />
        </div>
        <form autoComplete="on" className="form-container">
          <div className="center-align-elem">
            <Field
              className="form-control mb-2 mr-sm-4"
              name="sortBy"
              type="text"
              label="Sortuj po:"
              component={select}
              options={sortByOptionsIngredient}
            />
            <Field
              className="form-control mb-2 mr-sm-4"
              name="ascendingSort"
              type="text"
              label="Opcje sortowania:"
              component={select}
              options={ascendingSortOptions}
            />
          </div>
          <div className="center-align-elem">
            <input
              defaultValue={currentPage}
              name="currentPage"
              hidden={true}
            ></input>
            <Field
              className="form-control mb-2 mr-sm-4"
              name="elementsOnPage"
              type="text"
              label="Ilość elementów na stronie:"
              component={select}
              options={elementsOnPageOptions}
            />
          </div>
          <button
            className="btn btn-success"
            name="submit_button"
            type="submit"
            onClick={handleClick}
          >
            {" "}
            Szukaj{" "}
          </button>
        </form>
        <div>
          <table className="table table-striped ">
            <thead className="bg-success">
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Miara</th>
                <th scope="col">Aktywny</th>
                <th scope="col">Opcje</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map(elem => (
                <tr key={elem.id}>
                  <th scope="row">{elem.ingredientName}</th>
                  <td>{elem.measure.measureName}</td>
                  <td>{renderBooelan(elem.active)}</td>
                  {elem.active ? (
                    <td></td>
                  ) : (
                    <td>
                      <button
                        disabled={fetching}
                        className="btn btn-info btn-rounded btn-sm my-0 "
                        text="Activate"
                        onClick={() =>
                          handleActiveIngredient(elem.id, elem.version)
                        }
                      >
                        Aktywuj
                      </button>
                      <span className="table-remove">
                        <button
                          disabled={fetching}
                          type="button"
                          className="btn btn-danger btn-rounded btn-sm my-0"
                          onClick={() => handleDeleteIngredient(elem.id)}
                        >
                          Usuń
                        </button>
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            handlePagination={handlePagination}
            pageCount={pageCount}
            paginationElem={paginationElem}
          />
        </div>
      </div>
    </LayoutMain>
  );
};

Ingredients.propTypes = {
  currentPage: number,
  fetching: bool,
  handleActiveIngredient: func,
  handleDeleteIngredient: func,
  handleClick: func,
  handlePagination: func,
  ingredients: array,
  pageCount: number,
  paginationElem: array
};

export default reduxForm({
  form: "ingredientsform",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Ingredients);
