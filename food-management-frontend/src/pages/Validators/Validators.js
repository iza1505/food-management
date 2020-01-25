import _ from "lodash";

const validator = require("email-validator");

const validateRequired = value =>
  value && !_.isEqual(value, '""') ? undefined : "To pole jest wymagane.";

const validateConfirmedPassword = (passwordConfirm, allValues) =>
  allValues.password1 === passwordConfirm
    ? undefined
    : "Hasła muszą być takie same.";

const validateEmail = email =>
  validator.validate(email) ? undefined : "Niepoprawny format adresu email.";

const validateLogin = login =>
  login && login.length > 7 && login.length < 33
    ? undefined
    : "Login musi zawierać od 8 do 32 znaków.";

const validatePasswordLength = password =>
  password && password.length > 7 && password.length < 65
    ? undefined
    : "Password musi zawierać od 8 do 64 znaków.";

const validatePasswordUpperLowerCase = password =>
  hasLowerCase(password) && hasUpperCase(password)
    ? undefined
    : "Password musi zawierać wielkie i małe litery.";

const validatePasswordDidits = password =>
  hasDigit(password) ? undefined : "Password musi zawierać min. 1 cyfrę.";

const validateInteger = value => {
  const regex = /^[0-9\b]+$/;
  if (regex.test(value) && value > 0) {
    return undefined;
  } else {
    return "Wartość musi być liczbą całkowitą większą od 0.";
  }
};

const validateSelectedOption = value =>
  value ? undefined : "Wybierz opcję z listy.";

function hasDigit(string) {
  return string.match(/\d/);
}
function hasLowerCase(string) {
  return string.toUpperCase() !== string;
}

function hasUpperCase(string) {
  return string.toLowerCase() !== string;
}

export {
  validateRequired,
  validateConfirmedPassword,
  validateEmail,
  validateLogin,
  validatePasswordLength,
  validatePasswordUpperLowerCase,
  validatePasswordDidits,
  validateSelectedOption,
  validateInteger
};
