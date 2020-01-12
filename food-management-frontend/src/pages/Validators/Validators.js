const validator = require("email-validator");

const validateRequired = value =>
  value ? undefined : "This field is required.";

const validateConfirmedPassword = (passwordConfirm, allValues) =>
  allValues.password1 === passwordConfirm
    ? undefined
    : "Those passwords didn't match. Try again.";

const validateEmail = email =>
  validator.validate(email) ? undefined : "Incorrect email.";

const validateLogin = login =>
  login && login.length > 7 && login.length < 33
    ? undefined
    : "Login must be between 8 and 32 characters.";

const validatePasswordLength = password =>
  password && password.length > 7 && password.length < 65
    ? undefined
    : "Password must be between 8 and 64 characters.";

const validatePasswordUpperLowerCase = password =>
  hasLowerCase(password) && hasUpperCase(password)
    ? undefined
    : "Password must contains upper and lower case.";

const validatePasswordDidits = password =>
  hasDigit(password) ? undefined : "Password must containd min 1 digit.";

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
  validatePasswordDidits
};
