import React, { Component } from "react";
import { array, string, object } from "prop-types";
import _ from "lodash";
import Select from "react-select";

const recipeSelect = ({
  input,
  label,
  options,
  type,
  className,
  meta: { touched, error, warning }
}) => {
  //console.log("input: " + JSON.stringify(input));
  return (
    <div
      style={{ paddingLeft: "50px", alignContent: "center" }}
      key={input.name}
    >
      <label>{label}</label>
      <select
        {...input}
        defaultValue={input.value}
        style={{ position: "relative" }}
        type={type}
        className={className}
        name={input.name + input.value.id}
        key={input.name}
        onChange={e => console.log(e.target.value)}
      >
        {options.map(elem =>
          _.isEqual(elem.value, input.value) ? (
            <option
              value={elem.value}
              key={elem.value.id + input.name}
              //selected="selected"
            >
              {elem.label}
            </option>
          ) : (
            <option value={elem.value.id} key={elem.value.id + input.name}>
              {elem.label}
            </option>
          )
        )}
      </select>
      {touched &&
        ((error && <span style={{ color: "red" }}>{error}</span>) ||
          (warning && <span style={{ color: "yellow" }}>{warning}</span>))}
    </div>

    // <div>
    //   <label>{label}</label>
    //   <Select
    //     autosize={true}
    //     style={{ width: "100px", display: "inline" }}
    //     type={type}
    //     value={options.filter(({value}) => _.isEqual(value, input.value))}
    //     // defaultValue={options.find(obj =>
    //     //   _.isEqual(obj.value, input.value)
    //     //     ? { label: obj.label, value: obj.value }
    //     //     : "obj"
    //     // )}
    //    // value={input.value}

    //     // value={
    //     //   input.value === ""
    //     //     ? null
    //     //     : options.find(obj => _.isEqual(obj.value, input.value))
    //     // }
    //     options={options}
    //   ></Select>
    //   {touched &&
    //     ((error && <span style={{ color: "red" }}>{error}</span>) ||
    //       (warning && <span style={{ color: "yellow" }}>{warning}</span>))}
    // </div>
  );
};

recipeSelect.propTypes = {
  className: string,
  input: object,
  label: string,
  meta: object,
  options: array,
  type: string.isRequired
};

export default recipeSelect;
