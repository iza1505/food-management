import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { toast } from "react-toastify";

import ChangePasswordModalForm from "./ChangePasswordModalForm.component";
import { changePassword } from "../../../actions/user.actions";

export class ChangePasswordModalFormContainer extends Component {
  static propTypes = {
    changePassword: func
  };

  handleSubmit = values => {
    return this.props
      .changePassword(values.oldPassword, values.password1)
      .then(() => {
        toast.info("Password has been changed.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid data.");
        }
      });
  };

  render() {
    return <ChangePasswordModalForm onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  changePassword
};

export default connect(
  null,
  mapDispatchToProps
)(ChangePasswordModalFormContainer);
