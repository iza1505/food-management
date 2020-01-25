import React from "react";
import { array, bool, number, func } from "prop-types";
import { reduxForm, Field } from "redux-form";

import {
  elementsOnPageOptions,
  userSortByOptionsAdmin,
  ascendingSortOptions
} from "../../configuration/recipeConst";

import LayoutMain from "../../components/layouts/MainLayout";
import select from "../../components/Fields/select";
import Pagination from "../../components/Pagination/Pagination";

import RegistrationModalForm from "../registrationAndMore/RegistrationModalForm";

export const UsersManagement = props => {
  const {
    pageCount,
    users,
    currentPage,
    handleChangeStatus,
    handlePagination,
    paginationElem,
    handleClick,
    fetching,
    userId
  } = props;
  return (
    <LayoutMain title="Użytkownicy">
      <div>
        <div className="center-align-elem">
          <button
            className="btn btn-success "
            data-toggle="modal"
            data-target="#registrationModal"
            text="Add new user"
            style={{
              marginLeft: "5px"
            }}
          >
            Dodaj nowego użytkownika
          </button>
          <RegistrationModalForm />
        </div>
        <form autoComplete="on" className="form-container ">
          <div className="center-align-elem">
            <Field
              className="form-control mb-2 mr-sm-4"
              name="sortBy"
              type="text"
              label="Sortuj po:"
              component={select}
              options={userSortByOptionsAdmin}
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
                <th scope="col">Login</th>
                <th scope="col">Rola</th>
                <th scope="col">Email</th>
                <th scope="col">Aktywny</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((elem, index) => (
                  <tr
                    key={index}
                    className={
                      elem.id === userId
                        ? "font-weight-bold text-success"
                        : null
                    }
                  >
                    <th scope="row">{elem.login}</th>
                    <td>{elem.role}</td>
                    <td>{elem.email}</td>
                    <td>
                      <input
                        type="checkbox"
                        id="activeStatus"
                        name="activeStatus"
                        className="form-control"
                        data-swchoff-text="OFF"
                        data-swchon-text="ON"
                        checked={elem.active}
                        disabled={elem.id === userId ? true : fetching}
                        onChange={e =>
                          handleChangeStatus(elem.id, elem.version, e)
                        }
                      ></input>
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

UsersManagement.propTypes = {
  currentPage: number,
  fetching: bool,
  handleChangeStatus: func,
  handleClick: func,
  handlePagination: func,
  pageCount: number,
  paginationElem: array,
  userId: number,
  users: array
};

export default reduxForm({
  form: "usersManagementForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(UsersManagement);
