import React from "react";
import { array, string, object } from "prop-types";

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
      {console.log(JSON.stringify(input))}
      <label>{label}</label>
      <select
        {...input}
        style={{ position: "relative" }}
        type={type}
        className={className}
        defaultValue={"salt (g)"}
        //value={JSON.stringify(input.value)}
      >
        {options.map(elem =>
          input.value === elem.value ? (
            <option
              value={JSON.stringify(elem.value)}
              key={input.name + elem.value}
              selected="selected"
            >
              {elem.label}
            </option>
          ) : (
            <option
              value={JSON.stringify(elem.value)}
              key={input.name + elem.value}
            >
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

{
  /* <option
            value={JSON.stringify(elem.value)}
            key={input.name + elem.value}
          >
            {elem.label}
          </option> */
}
