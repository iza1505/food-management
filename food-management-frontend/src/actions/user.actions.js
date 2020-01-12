import { APIService } from "../services/RequestCreator";

export const ACTIONS = {
  LOGIN_USER: "USER_LOGIN_USER",
  LOGOUT_USER: "USER_LOGOUT_USER",
  SEND_CONFIRMATION_EMAIL: "USER_SEND_CONFIRMATION_EMAIL",
  REGISTER_USER: "USER_REGISTER_USER",
  SEND_RESET_PASSWORD_EMAIL: "USER_SEND_RESET_PASSWORD_EMAIL",
  //REFRESH_TOKEN: "USER_REFRESH_TOKEN"
  RESET_PASSWORD: "USER_RESET_PASSWORD",
  GET_DETAILS: "USER_GET_DETAILS",
  UPDATE_DETAILS: "USER_UPDATE_DETAILS",
  CHANGE_PASSWORD: "USER_CHANGE_PASSWORD"
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

const sendConfirmationMail = (login, email) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.SEND_CONFIRMATION_EMAIL, {
      url: "/auth/resendConfirmationEmail",
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        login: login,
        email: email
      }
    })
  );
};

const sendResetPasswordMail = (login, email) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.SEND_RESET_PASSWORD_EMAIL, {
      url: "/auth/forgotPassword",
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        login: login,
        email: email
      }
    })
  );
};

const resetPassword = (url, password) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.RESET_PASSWORD, {
      url: url,
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        password: password
      }
    })
  );
};

const confirmAccount = url => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.CONFIRMATION_EMAIL, {
      url: url,
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const register = (login, email, password) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.REGISTER_USER, {
      url: "/auth/registration",
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        login: login,
        email: email,
        password: password
      }
    })
  );
};

const getDetails = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_DETAILS, {
      url: `/users/myAccount`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const updateDetails = (email, version) => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.UPDATE_DETAILS, {
      url: "/users/myAccount",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        email: email,
        version: version
      }
    })
  );
};

const changePassword = (oldPassword, newPassword) => dispatch => {
  console.log(oldPassword + newPassword);
  return dispatch(
    APIService.put(ACTIONS.CHANGE_PASSWORD, {
      url: "/users/myAccount/changePassword",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    })
  );
};

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

export {
  loginUser,
  logoutUser,
  sendConfirmationMail,
  confirmAccount,
  register,
  sendResetPasswordMail,
  resetPassword,
  getDetails,
  updateDetails,
  changePassword
};
