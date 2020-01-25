import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  GET_USERS: "USERS_GET_USERS",
  CHANGE_ACCOUNT_STATUS: "USERS_CHANGE_ACCOUNT_STATUS",
  RESET_USERS: "USERS_RESET_USERS",
  RESET_CURRENTPAGE_ON_SUBMIT: "USERS_RESET_CURRENTPAGE_ON_SUBMIT"
};

const getUsers = url => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_USERS, {
      url: url,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const changeAccountStatus = (id, active, version) => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.CHANGE_ACCOUNT_STATUS, {
      url: "/users",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        id: id,
        active: active,
        version: version
      }
    })
  );
};

const resetCurrentPageOnSubmit = () => dispatch => {
  dispatch({
    type: ACTIONS.RESET_CURRENTPAGE_ON_SUBMIT
  });
};

const resetUsers = () => dispatch => {
  dispatch({
    type: ACTIONS.RESET_USERS
  });
};

export { getUsers, changeAccountStatus, resetCurrentPageOnSubmit, resetUsers };
