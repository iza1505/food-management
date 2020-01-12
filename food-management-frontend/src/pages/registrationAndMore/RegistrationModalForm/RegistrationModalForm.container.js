import React, { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { toast } from "react-toastify";

import RegistrationModalForm from "./RegistrationModalForm.component";
import { register } from "../../../actions/user.actions";

export class RegistrationModalFormContainer extends Component {
  static propTypes = {
    register: func
  };

  handleSubmit = values => {
    return this.props
      .register(values.login, values.email, values.password1)
      .then(() => {
        toast.info("Confirmation email was send.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Invalid registration data.");
        }
      });
  };

  render() {
    return <RegistrationModalForm onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  register
};

export default connect(
  null,
  mapDispatchToProps
)(RegistrationModalFormContainer);
