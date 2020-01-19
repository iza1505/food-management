function renderBooelan(value) {
  if (value) {
    return "yes";
  } else {
    return "no";
  }
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export { renderBooelan, IsJsonString };
