import React from "react";
import { string, object } from "prop-types";

const renderInput = ({
  input,
  label,
  placeholder,
  type,
  className,
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <div>
        <label>{label}</label>
        <input
          {...input}
          style={{ position: "relative" }}
          placeholder={placeholder}
          type={type}
          className={className}
        />
        {touched &&
          ((error && <span style={{ color: "red" }}>{error}</span>) ||
            (warning && <span style={{ color: "yellow" }}>{warning}</span>))}
      </div>
    </div>
  );
};

renderInput.propTypes = {
  input: object,
  label: string,
  placeholder: string,
  meta: object,
  type: string.isRequired,
  className: string
};

export default renderInput;
