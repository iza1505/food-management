import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { toast } from "react-toastify";

import ResetPasswordModalForm from "./ResetPasswordModalForm.component";
import { sendResetPasswordMail } from "../../../actions/user.actions";

export class ResetPasswordModalFormContainer extends Component {
  static propTypes = {
    sendResetPasswordMail: func
  };

  handleSubmit = values => {
    return this.props
      .sendResetPasswordMail(values.login, values.email)
      .then(() => {
        toast.info("Change password email was send.");
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
    return <ResetPasswordModalForm onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  sendResetPasswordMail
};

export default connect(
  null,
  mapDispatchToProps
)(ResetPasswordModalFormContainer);
