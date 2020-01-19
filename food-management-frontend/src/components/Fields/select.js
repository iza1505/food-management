import React from "react";
import { array, string, object } from "prop-types";
import _ from "lodash";
const renderInput = ({
  input,
  label,
  options,
  type,
  className,
  meta: { touched, error, warning },
  name,
  defaultValue
}) => {
  return (
    <div style={{ paddingLeft: "50px", alignContent: "center" }}>
      <label>{label}</label>
      <select
        {...input}
        style={{ position: "relative" }}
        type={type}
        className={className}
      >
        {options.map((elem, index) =>
          _.isEqual(elem.value, input.value) ? (
            <option value={JSON.stringify(elem.value)} key={index}>
              {elem.label}
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
  className: string,
  input: object,
  label: string,
  meta: object,
  options: array,
  type: string.isRequired
};

export default renderInput;
