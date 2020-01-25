function renderBooelan(value) {
  if (value) {
    return "tak";
  } else {
    return "nie";
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

function isPositiveInteger(value) {
  const floatN = parseFloat(value);
  return !isNaN(floatN) && isFinite(value) && floatN > 0 && floatN % 1 === 0;
}

export { renderBooelan, IsJsonString, isPositiveInteger };
