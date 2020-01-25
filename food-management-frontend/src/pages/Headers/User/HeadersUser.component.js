import React from "react";
import { array, number, func, string } from "prop-types";
import { reduxForm, Field } from "redux-form";

import {
  elementsOnPageOptions,
  possibleMissingIngredientsAmountOptions,
  sortByOptionsUser,
  sortByOptionsAdmin,
  ascendingSortOptions
} from "../../../configuration/recipeConst";

import { userRoles } from "../../../configuration/roles";
import LayoutMain from "../../../components/layouts/MainLayout";
import input from "../../../components/Fields/input";
import select from "../../../components/Fields/select";
import Pagination from "../../../components/Pagination/Pagination";
import { renderBooelan } from "../../../configuration/helpers";

export const HeadersUser = props => {
  const {
    pageCount,
    recipeHeaders,
    currentPage,
    handlePagination,
    paginationElem,
    userRole,
    handleClick
  } = props;

  return (
    <LayoutMain title="Przepisy">
      <div>
        <form autoComplete="on" className="form-container">
          <div className="center-align-elem">
            <Field
              className="form-control mb-2 mr-sm-4"
              name="sortBy"
              type="text"
              label="Sortuj po:"
              component={select}
              options={
                userRole === userRoles.user
                  ? sortByOptionsUser
                  : sortByOptionsAdmin
              }
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
            {userRole === userRoles.user ? (
              <Field
                className="form-control mb-2 mr-sm-4"
                name="possibleMissingIngredientsAmount"
                type="text"
                label="Max. możliwa ilość brakujących składników:"
                component={select}
                options={possibleMissingIngredientsAmountOptions}
              />
            ) : (
              <></>
            )}
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
          {userRole === userRoles.user ? (
            <table className="table table-striped ">
              <thead className="bg-success">
                <tr>
                  <th scope="col">Tytuł</th>
                  <th scope="col">Ilość brakujących składników</th>
                  <th scope="col">Możliwy % do ugotowania (z posiadanych produktów)</th>
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
          ) : (
            <table className="table table-striped">
              <thead className="bg-success">
                <tr>
                  <th scope="col">Tytuł</th>
                  <th scope="col">Login autora</th>
                  <th scope="col">Aktywny</th>
                  <th scope="col">Oczekuje na sprawdzenie</th>
                  <th scope="col">Zgłoszone uwagi</th>
                </tr>
              </thead>
              <tbody>
                {recipeHeaders.map(elem => (
                  <tr key={elem.id}>
                    <th scope="row">
                      <a href={"/recipes/" + elem.id}>{elem.title}</a>
                    </th>
                    <td>{elem.userLogin}</td>
                    <td>{renderBooelan(elem.active)}</td>
                    <td>{renderBooelan(elem.waitingForAccept)}</td>
                    <td>{elem.toImprove}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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

HeadersUser.propTypes = {
  currentPage: number,
  handlePagination: func,
  pageCount: number,
  paginationElem: array,
  recipeHeaders: array,
  userRole: string,
  handleClick: func
};

export default reduxForm({
  form: "headersform",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(HeadersUser);
//export default HeadersUser;
