import React from "react";
import { array, bool, number, object, string, func } from "prop-types";
import { reduxForm, Form, Field } from "redux-form";
import _ from "lodash";

import LayoutMain from "../../../components/layouts/MainLayout";
import input from "../../../components/Fields/input";

export const HeadersUser = props => {
  const {
    pageCount,
    recipeHeaders,
    elementsOnPage,
    elementsOnPageOptions,
    currentPage,
    sortBy,
    sortByOptions,
    ascendingSort,
    possibleMissingIngredientsAmount,
    handlePagination,
    paginationElem
  } = props;
  return (
    <LayoutMain title="Recipes">
      <div>
        <Form autoComplete="on">
          <div className="center-align-elem">
            <label>Elements on page: </label>
            <Field
              className="form-control mb-2 mr-sm-4"
              name="elementsOnPage"
              type="text"
              placeholder="Elements on page"
              //validate={validateRequired}
              component="select"
              options={elementsOnPageOptions}
            >
              {elementsOnPageOptions.map(elem => (
                <option value={elem} key={elem}>
                  {elem}
                </option>
              ))}
            </Field>
            <label>Possible missing ingredients amount:</label>
            <Field
              className="form-control mb-0 mr-sm-4"
              name="possibleMissingIngredientsAmount"
              placeholder="possible Missing Ingredients Amount"
              //validate={validateRequired} //do ilosci posiadanych skladnikow
              type="text"
              component={input}
            />
            <input
              defaultValue={currentPage}
              name="currentPage"
              hidden={true}
            ></input>
          </div>
          <div className="center-align-elem">
            <label>Sort by: </label>
            <Field
              className="form-control mb-0 mr-sm-4"
              name="sortBy"
              placeholder="Sort by"
              //validate={validateRequired}
              type="text"
              component="select"
            >
              {sortByOptions.map(elem => (
                <option value={elem.value} key={elem.value}>
                  {elem.label}
                </option>
              ))}
            </Field>
            <label className="ml-2 ">Sort option: </label>
            <Field
              className="form-control mb-2 mr-sm-4"
              name="ascendingSort"
              placeholder="Ascending sort"
              //validate={validateRequired}
              type="text"
              component="select"
            >
              <option value={true}>Ascending</option>
              <option value={false}>Descending</option>
            </Field>
          </div>
          <button className="btn btn-success" type="submit">
            {" "}
            Search{" "}
          </button>
        </Form>
        <nav aria-label="...">
          <ul className="pagination">
            <li
              className={
                _.isEqual(Number(1), Number(currentPage))
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => handlePagination(currentPage - 1)}
                tabIndex="-1"
              >
                Previous
              </a>
            </li>
            {paginationElem.map(page => (
              <li
                className={
                  _.isEqual(Number(page), Number(currentPage))
                    ? "page-item active"
                    : "page-item"
                }
                key={page}
              >
                <a className="page-link" onClick={() => handlePagination(page)}>
                  {page}
                </a>
              </li>
            ))}
            <li
              className={
                _.gte(Number(currentPage), Number(pageCount))
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() =>
                  handlePagination(Number(currentPage) + Number(1))
                }
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <table className="table table-striped">
            <thead className="bg-success">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Missing ingredient amout</th>
                <th scope="col">Cookable %</th>
              </tr>
            </thead>
            <tbody>
              {recipeHeaders.map(elem => (
                <tr key={elem.id}>
                  <th scope="row">
                    <a href={"/recipes/" + elem.id}>{elem.title}</a>
                  </th>
                  <td>{elem.missingIngredientsAmount}</td>
                  <td>{elem.percentageToCook}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutMain>
  );
};

HeadersUser.propTypes = {
  ascendingSort: bool,
  currentPage: number,
  elementsOnPage: number,
  elementsOnPageOptions: array,
  handlePagination: func,
  pageCount: number,
  paginationElem: array,
  possibleMissingIngredientsAmount: number,
  recipeHeaders: array,
  sortBy: string,
  sortByOptions: array
};

export default reduxForm({
  form: "headersform",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(HeadersUser);
//export default HeadersUser;
