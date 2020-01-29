import React from "react";
import { array, bool, number, func, string } from "prop-types";
import { reduxForm, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

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
import { userRoles } from "../../configuration/roles";

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
    handleClick,
    url,
    userRole,
    t
  } = props;

  return (
    <LayoutMain title={t("pageTitle.ingredients")}>
      <div>
        <div className="center-align-elem">
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#ingredientPropositionModal"
            text="New product"
            style={{
              marginLeft: "5px"
            }}
          >
            {userRole === userRoles.manager ? (
              <>{t("button.addNewProductToDatabase")}</>
            ) : (
              <>{t("button.newIngredientProposition")}</>
            )}
          </button>
          <IngredientProposition url={url} />
        </div>

        <form autoComplete="on" className="form-container">
          <div className="center-align-elem">
            <Field
              className="form-control mb-2 mr-sm-4"
              name="sortBy"
              type="text"
              label={t("label.sortBy")}
              allNeedTranslate={true}
              component={select}
              options={sortByOptionsIngredient}
            />
            <Field
              className="form-control mb-2 mr-sm-4"
              name="ascendingSort"
              type="text"
              label={t("label.sortOptions")}
              allNeedTranslate={true}
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
              allNeedTranslate={true}
              label={t("label.elementsOnPage")}
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
            {t("button.search")}
          </button>
        </form>
        <div>
          <table className="table table-striped ">
            <thead className="bg-success">
              <tr>
                <th scope="col">{t("tableLabel.name")}</th>
                <th scope="col">{t("tableLabel.measure")}</th>
                <th scope="col">{t("tableLabel.active")}</th>
                {userRole === userRoles.manager ? (
                  <th scope="col">{t("tableLabel.options")}</th>
                ) : (
                  <></>
                )}
              </tr>
            </thead>
            <tbody>
              {ingredients.map(elem => (
                <tr key={elem.id}>
                  <th scope="row">{elem.ingredientName}</th>
                  <td>{elem.measure.measureName}</td>
                  <td>{t(renderBooelan(elem.active))}</td>
                  {userRole === userRoles.manager ? (
                    <>
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
                            {t("button.activate")}
                          </button>
                          <span className="table-remove">
                            <button
                              disabled={fetching}
                              type="button"
                              className="btn btn-danger btn-rounded btn-sm my-0"
                              onClick={() => handleDeleteIngredient(elem.id)}
                            >
                              {t("button.delete")}
                            </button>
                          </span>
                        </td>
                      )}
                    </>
                  ) : (
                    <></>
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
  handleClick: func,
  handleDeleteIngredient: func,
  handlePagination: func,
  ingredients: array,
  pageCount: number,
  paginationElem: array,
  url: string,
  userRole: string
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "ingredientsform",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })
)(Ingredients);
