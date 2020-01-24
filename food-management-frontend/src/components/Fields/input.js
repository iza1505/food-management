import React from "react";
import { bool, string, object } from "prop-types";

const renderInput = ({
  input,
  label,
  placeholder,
  type,
  className,
  disabled,
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <div style={{ alignContent: "center", marginRight: "10px" }}>
        <label>{label}</label>
        <input
          {...input}
          style={{ position: "relative" }}
          placeholder={placeholder}
          type={type}
          className={className}
          disabled={disabled}
        />
        {touched &&
          ((error && <span style={{ color: "red" }}>{error}</span>) ||
            (warning && <span style={{ color: "yellow" }}>{warning}</span>))}
      </div>
    </div>
  );
};

renderInput.propTypes = {
  disabled: bool,
  input: object,
  label: string,
  placeholder: string,
  meta: object,
  type: string.isRequired,
  className: string
};

export default renderInput;
