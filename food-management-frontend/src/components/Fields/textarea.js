import React from "react";
import { bool, string, object } from "prop-types";
import TextareaAutosize from "react-textarea-autosize";

const renderTextArea = ({
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
      <div>
        <label>{label}</label>
        <TextareaAutosize
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

renderTextArea.propTypes = {
  disabled: bool,
  input: object,
  label: string,
  placeholder: string,
  meta: object,
  type: string.isRequired,
  className: string
};

export default renderTextArea;
