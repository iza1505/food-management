import { APIService } from "../services/RequestCreator";
import { API_URL } from "../configuration";

export const ACTIONS = {
  LOGIN_USER: "USER_LOGIN_USER",
  LOGOUT_USER: "USER_LOGOUT_USER",
  SEND_CONFIRMATION_EMAIL: "USER_SEND_CONFIRMATION_EMAIL",
  REGISTER_USER: "USER_REGISTER_USER"
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

const confirmEmail = url => dispatch => {
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
  console.log(email);
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

export { loginUser, logoutUser, sendConfirmationMail, confirmEmail, register };
