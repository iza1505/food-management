import React from "react";
import { array, number, func } from "prop-types";
import { reduxForm, Field } from "redux-form";
import { compose } from "lodash/fp";
import { withTranslation } from "react-i18next";

import {
  elementsOnPageOptions,
  sortByOptionsAuthor,
  ascendingSortOptions
} from "../../../configuration/recipeConst";

import LayoutMain from "../../../components/layouts/MainLayout";
import input from "../../../components/Fields/input";
import select from "../../../components/Fields/select";
import Pagination from "../../../components/Pagination/Pagination";
import { renderBooelan } from "../../../configuration/helpers";

export const HeadersAuthor = props => {
  const {
    pageCount,
    recipeHeaders,
    currentPage,
    handleDeleteRecipe,
    handlePagination,
    paginationElem,
    handleClick,
    handleEditRecipe,
    t
  } = props;

  return (
    <LayoutMain title="Moje przepisy">
      <div>
        <form autoComplete="on" className="form-container">
          <div className="center-align-elem">
            <Field
              className="form-control mb-2 mr-sm-4"
              name="sortBy"
              type="text"
              label={t("label.sortBy")}
              component={select}
              allNeedTranslate={true}
              options={sortByOptionsAuthor}
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
            {" "}
            Szukaj{" "}
          </button>
        </form>
        <div>
          <table className="table table-striped">
            <thead className="bg-success">
              <tr>
                <th scope="col">{t("tableLabel.title")}</th>
                <th scope="col">{t("tableLabel.active")}</th>
                <th scope="col">{t("tableLabel.waitingForAccept")}</th>
                <th scope="col">{t("tableLabel.toImprove")}</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {recipeHeaders.map((elem, index) => (
                <tr key={index}>
                  <th scope="row">
                    <a href={"/recipes/" + elem.id}>{elem.title}</a>
                  </th>
                  <td>{t(renderBooelan(elem.active))}</td>
                  <td>{t(renderBooelan(elem.waitingForAccept))}</td>
                  <td>{elem.toImprove}</td>
                  <td>
                    <button
                      className="btn btn-info btn-rounded btn-sm my-0 "
                      text="Edit recipe"
                      onClick={() => handleEditRecipe(elem.id)}
                    >
                      Edytuj przepis
                    </button>
                    <span className="table-remove">
                      <button
                        //disabled={fetchingIngredients}
                        type="button"
                        className="btn btn-danger btn-rounded btn-sm my-0"
                        onClick={() => handleDeleteRecipe(elem.id)}
                      >
                        Usuń
                      </button>
                    </span>
                  </td>
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

HeadersAuthor.propTypes = {
  currentPage: number,
  handleClick: func,
  handleDeleteRecipe: func,
  handleEditRecipe: func,
  handlePagination: func,
  pageCount: number,
  paginationElem: array,
  recipeHeaders: array
};

export default compose(
  withTranslation("common"),
  reduxForm({
    form: "headersform",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })
)(HeadersAuthor);
