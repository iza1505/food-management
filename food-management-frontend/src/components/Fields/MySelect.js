import React, { Component } from "react";
import _ from "lodash";

class MySelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.input.value,
      options: this.props.options
    };
  }
  state = {
    value: this.props.input.value,
    options: []
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <select
          {...this.props.input}
          type={this.props.type}
          className={this.props.className}
          onChange={e => this.handleChange(e)}
          value={this.state.value}
        >
          {this.props.options.map((elem, index) =>
            _.isEqual(elem.value, this.props.input.value) ? (
              <option value={elem.value} key={index} selected="selected">
                {elem.label}
              </option>
            ) : (
              <option value={JSON.stringify(elem.value)} key={index}>
                {elem.label}
              </option>
            )
          )}
        </select>
        {this.props.meta.touched &&
          ((this.props.meta.error && (
            <span style={{ color: "red" }}>{this.props.meta.error}</span>
          )) ||
            (this.props.meta.warning && (
              <span style={{ color: "yellow" }}>{this.props.meta.warning}</span>
            )))}
      </div>
    );
  }
}

export default MySelect;
