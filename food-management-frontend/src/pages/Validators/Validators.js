import _ from "lodash";

const validator = require("email-validator");

const validateRequired = value =>
  value && !_.isEqual(value, "null") ? undefined : "validator.validateRequired";

const validateConfirmedPassword = (passwordConfirm, allValues) =>
  allValues.password1 === passwordConfirm
    ? undefined
    : "validator.validateConfirmedPassword";

const validateEmail = email =>
  validator.validate(email) ? undefined : "validator.validateEmail";

const validateLogin = login =>
  login && login.length > 7 && login.length < 33
    ? undefined
    : "validator.validateLogin";

const validatePasswordLength = password =>
  password && password.length > 7 && password.length < 65
    ? undefined
    : "validator.validatePasswordLength";

const validatePasswordUpperLowerCase = password =>
  hasLowerCase(password) && hasUpperCase(password)
    ? undefined
    : "validator.validatePasswordUpperLowerCase";

const validatePasswordDidits = password =>
  hasDigit(password) ? undefined : "validator.validatePasswordDidits";

const validateInteger = value => {
  const regex = /^[0-9\b]+$/;
  if (regex.test(value) && value > 0) {
    return undefined;
  } else {
    return "validator.validateInteger";
  }
};

const validateSelectedOption = value =>
  value ? undefined : "validator.validateSelectedOption";

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
