import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { toast } from "react-toastify";

import ConfirmationEmailModalForm from "./ConfirmationEmailModalForm.component";
import { sendConfirmationMail } from "../../../actions/user.actions";

export class ConfirmationEmailModalFormContainer extends Component {
  static propTypes = {
    sendConfirmationMail: func
  };

  handleSubmit = values => {
    return this.props
      .sendConfirmationMail(values.login, values.email)
      .then(() => {
        toast.info("Confirmation email was send.");
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
    return <ConfirmationEmailModalForm onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  sendConfirmationMail
};

export default connect(
  null,
  mapDispatchToProps
)(ConfirmationEmailModalFormContainer);
