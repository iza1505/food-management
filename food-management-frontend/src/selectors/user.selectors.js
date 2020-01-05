import get from "lodash/get";
import { userRoles } from "../configuration/roles";

const getLoggedStatus = state => get(state, "user.logged", false);
const getId = state => get(state, "user.id");
const getToken = state => get(state, "user.token");
const getTokenExpDate = state => get(state, "user.tokenExpDate");
const getRole = state => get(state, "user.role");
const getLogin = state => get(state, "user.login");
const getFetchingUser = state => get(state, "user.fetchingUser");

const isUserUser = state => getRole(state) === userRoles.user;
const isUserAdmin = state => getRole(state) === userRoles.admin;

export {
  getLoggedStatus,
  getId,
  getToken,
  getTokenExpDate,
  getRole,
  getLogin,
  getFetchingUser,
  isUserUser,
  isUserAdmin
};
