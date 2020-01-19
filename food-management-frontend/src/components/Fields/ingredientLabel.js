import React from "react";
import { string, object } from "prop-types";

const ingredientLabel = ({
  input,
  label,
  placeholder,
  type,
  className,
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <label style={{ fontSize: "20px", marginLeft: "5px" }}>
        {input.value}
      </label>
    </div>
  );
};

ingredientLabel.propTypes = {
  input: object,
  label: string,
  placeholder: string,
  meta: object,
  type: string.isRequired,
  className: string
};

export default ingredientLabel;
