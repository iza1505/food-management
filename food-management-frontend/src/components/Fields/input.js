import React from "react";
import { string, object } from "prop-types";

const renderInput = ({
  input,
  placeholder,
  type,
  className,
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <div>
        <input
          {...input}
          style={{ position: "relative" }}
          placeholder={placeholder}
          type={type}
          className={className}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

renderInput.propTypes = {
  input: object,
  placeholder: string,
  meta: object,
  type: string.isRequired,
  className: string
};

export default renderInput;
