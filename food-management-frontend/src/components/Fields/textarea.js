import React from "react";
import { bool, string, object } from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import { withTranslation } from "react-i18next";

const renderTextArea = ({
  input,
  label,
  placeholder,
  type,
  className,
  disabled,
  meta: { touched, error, warning },
  t
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
          ((error && <span style={{ color: "red" }}>{t(error)}</span>) ||
            (warning && <span style={{ color: "yellow" }}>{t(warning)}</span>))}
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

export default withTranslation("common")(renderTextArea);
