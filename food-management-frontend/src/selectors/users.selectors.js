import get from "lodash/get";

const getUsers = state => get(state, "users.users");
const getFetchingUsers = state => get(state, "users.fetchingUsers");
const getPageCount = state => get(state, "users.pageCount");
const getCurrentPage = state => get(state, "users.currentPage");
const getError = state => get(state, "users.error");

export { getUsers, getFetchingUsers, getPageCount, getCurrentPage, getError };
