import React from "react";
import { array, string, object } from "prop-types";

const renderInput = ({
  input,
  label,
  options,
  type,
  className,
  meta: { touched, error, warning }
}) => {
  return (
    <div style={{paddingLeft: "50px", alignContent: "center"}}>
      <label>{label}</label>
      <select
        {...input}
        style={{ position: "relative" }}
        type={type}
        className={className}
      >
        {options.map(elem => (
          <option value={elem.value} key={elem.value}>
            {elem.label}
          </option>
        ))}
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
