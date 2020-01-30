import React from "react";
import { array, bool, string, object } from "prop-types";
import { withTranslation } from "react-i18next";

const renderSelect = ({
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
        ((error && <span style={{ color: "red" }}>{t(error)}</span>) ||
          (warning && <span style={{ color: "yellow" }}>{t(warning)}</span>))}
    </div>
  );
};

renderSelect.propTypes = {
  allNeedTranslate: bool,
  className: string,
  firstNeedTranslate: bool,
  input: object,
  label: string,
  meta: object,
  options: array,
  type: string.isRequired
};

export default withTranslation("common")(renderSelect);
