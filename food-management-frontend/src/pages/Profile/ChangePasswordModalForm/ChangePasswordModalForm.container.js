import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";
import { toast } from "react-toastify";

import ChangePasswordModalForm from "./ChangePasswordModalForm.component";
import { changePassword } from "../../../actions/user.actions";
import { getError, getFetchingUser } from "../../../selectors/user.selectors";

export class ChangePasswordModalFormContainer extends Component {
  static propTypes = {
    changePassword: func,
    error: string,
    fetching: bool
  };

  handleSubmit = values => {
    return this.props
      .changePassword(values.oldPassword, values.password1)
      .then(() => {
        toast.info("Hasło zostało zmienione.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(
            "Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem."
          );
        } else {
          toast.error(this.props.error);
        }
      });
  };

  render() {
    return (
      <ChangePasswordModalForm
        onSubmit={this.handleSubmit}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  error: getError(state),
  fetching: getFetchingUser(state)
});

const mapDispatchToProps = {
  changePassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordModalFormContainer);
