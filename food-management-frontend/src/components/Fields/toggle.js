import React from "react";
import { bool, string, object } from "prop-types";
import Switch from "react-switch";

const renderToggle = ({ input, label }) => {
  return (
    <div>
      <div style={{ marginRight: "10px" }}>
        <label style={{ marginRight: "10px" }}>{label}</label>
        <Switch
          checked={input.value}
          onChange={input.onChange}
          height={20}
          width={48}
        />
      </div>
    </div>
  );
};

renderToggle.propTypes = {
  disabled: bool,
  input: object,
  label: string,
  placeholder: string,
  className: string
};

export default renderToggle;
