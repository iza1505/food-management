import React from "react";
import { array, number, func } from "prop-types";
import { reduxForm, Field } from "redux-form";

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
    handleClick
  } = props;

  return (
    <LayoutMain title="My recipes">
      <div>
        <form autoComplete="on" className="form-container">
          <div className="center-align-elem">
            <Field
              className="form-control mb-2 mr-sm-4"
              name="sortBy"
              type="text"
              label="Sort by:"
              component={select}
              options={sortByOptionsAuthor}
            />
            <Field
              className="form-control mb-2 mr-sm-4"
              name="ascendingSort"
              type="text"
              label="Sort option:"
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
              label="Elements on page:"
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
            Search{" "}
          </button>
        </form>
        <div>
          <table className="table table-striped">
            <thead className="bg-success">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Active</th>
                <th scope="col">Waiting for accept</th>
                <th scope="col">To improve</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {recipeHeaders.map((elem, index) => (
                <tr key={index}>
                  <th scope="row">
                    <a href={"/recipes/" + elem.id}>{elem.title}</a>
                  </th>
                  <td>{renderBooelan(elem.active)}</td>
                  <td>{renderBooelan(elem.waitingForAccept)}</td>
                  <td>{elem.toImprove}</td>
                  <td>
                    <span className="table-remove">
                      <button
                        //disabled={fetchingIngredients}
                        type="button"
                        className="btn btn-danger btn-rounded btn-sm my-0"
                        onClick={() => handleDeleteRecipe(elem.id)}
                      >
                        Remove
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
  handlePagination: func,
  pageCount: number,
  paginationElem: array,
  recipeHeaders: array
};

export default reduxForm({
  form: "headersform",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(HeadersAuthor);
//export default HeadersUser;
