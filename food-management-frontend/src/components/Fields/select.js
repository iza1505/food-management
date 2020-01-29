import React from "react";
import { array, bool, string, object } from "prop-types";
import _ from "lodash";
import { withTranslation } from "react-i18next";

const renderInput = ({
  input,
  label,
  options,
  type,
  className,
  firstNeedTranslate,
  allNeedTranslate,
  meta: { touched, error, warning },
  t
}) => {
  return (
    <div style={{ alignContent: "center", marginRight: "10px" }}>
      <label>{label}</label>
      <select
        {...input}
        style={{ position: "relative" }}
        type={type}
        className={className}
      >
        {options.map((elem, index) =>
          allNeedTranslate ? (
            <option value={JSON.stringify(elem.value)} key={index}>
              {t(elem.label)}
            </option>
          ) : firstNeedTranslate && index === 0 ? (
            <option value={JSON.stringify(elem.value)} key={index}>
              {t(elem.label)}
            </option>
          ) : (
            <option value={JSON.stringify(elem.value)} key={index}>
              {elem.label}
            </option>
          )
        )}
      </select>
      {touched &&
        ((error && <span style={{ color: "red" }}>{error}</span>) ||
          (warning && <span style={{ color: "yellow" }}>{warning}</span>))}
    </div>
  );
};

renderInput.propTypes = {
  allNeedTranslate: bool,
  className: string,
  firstNeedTranslate: bool,
  input: object,
  label: string,
  meta: object,
  options: array,
  type: string.isRequired
};

export default withTranslation("common")(renderInput);
//export default renderInput;
