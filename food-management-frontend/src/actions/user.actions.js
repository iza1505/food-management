import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  LOGIN_USER: "USER_LOGIN_USER",
  LOGOUT_USER: "USER_LOGOUT_USER",
  //REFRESH_TOKEN: "USER_REFRESH_TOKEN"
};

const loginUser = (login, password) => dispatch =>
dispatch(
    APIService.post(ACTIONS.LOGIN_USER, {
      url: "/auth/login",
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        login: login,
        password: password
      }
    })
  );

const logoutUser = () => dispatch =>
  dispatch({
    type: ACTIONS.LOGOUT_USER
  });

// const refreshToken = token => dispatch =>
//   dispatch(
//     APIService.post(ACTIONS.REFRESH_TOKEN, {
//       url: "/refresh",
//       needAuth: true,
//       headers: {
//         "Content-type": "application/json"
//       },
//       data: {
//         token: token
//       }
//     })
//   );


export { loginUser, logoutUser };
