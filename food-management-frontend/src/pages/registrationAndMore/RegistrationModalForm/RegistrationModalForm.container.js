import React, { Component } from "react";
import { connect } from "react-redux";
import { func, string, bool } from "prop-types";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import RegistrationModalForm from "./RegistrationModalForm.component";
import { register } from "../../../actions/user.actions";
import { getRole, getFetchingUser } from "../../../selectors/user.selectors";

export class RegistrationModalFormContainer extends Component {
  static propTypes = {
    dispatch: func,
    fetching: bool,
    register: func,
    userRole: string
  };

  handleSubmit = values => {
    let role;

    if (values.role) {
      role = values.role.replace(/"/g, "");
    } else {
      role = null;
    }
    return this.props
      .register(values.login, values.email, values.password1, role)
      .then(() => {
        this.props.dispatch(reset("registrationModalForm"));
        toast.info("Email aktywujący konto został wysłany.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem.");
        } else {
          toast.error("Niepoprawne dane.");
        }
      });
  };

  render() {
    return (
      <RegistrationModalForm
        onSubmit={this.handleSubmit}
        userRole={this.props.userRole}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  userRole: getRole(state),
  fetching: getFetchingUser(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    register: bindActionCreators(register, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationModalFormContainer);
