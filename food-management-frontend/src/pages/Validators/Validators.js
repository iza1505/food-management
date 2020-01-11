const validateRequired = value => (value ? "" : "This field is required.");

const validateConfirmedPassword = (password2, allValues) => {
  console.log(password2 + " XX " + allValues.password1);
  if (allValues.password1 === password2) {
    return null;
  } else {
    return "Those passwords didn't match. Try again.";
  }
};
//   allValues.password1 === password2
//     ? ""
//     : "Those passwords didn't match. Try again.";

export { validateRequired, validateConfirmedPassword };
