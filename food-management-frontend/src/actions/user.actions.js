import { APIService } from "../services/RequestCreator";
import { API_URL } from "../configuration";

export const ACTIONS = {
  LOGIN_USER: "USER_LOGIN_USER",
  LOGOUT_USER: "USER_LOGOUT_USER",
  SEND_CONFIRMATION_EMAIL: "USER_SEND_CONFIRMATION_EMAIL",
  REGISTER_USER: "USER_REGISTER_USER",
  SEND_RESET_PASSWORD_EMAIL: "USER_SEND_RESET_PASSWORD_EMAIL",
  //REFRESH_TOKEN: "USER_REFRESH_TOKEN"
  RESET_PASSWORD: "USER_RESET_PASSWORD"
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

const sendConfirmationMail = email => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.SEND_CONFIRMATION_EMAIL, {
      url: "/resendConfirmationEmail",
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        email: email
      }
    })
  );
};

const sendResetPasswordMail = email => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.SEND_RESET_PASSWORD_EMAIL, {
      url: "/forgotPassword",
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
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
  resetPassword
};
