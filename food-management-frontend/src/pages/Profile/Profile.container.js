import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, string } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import { getLogin, getEmail, getId } from "../../selectors/user.selectors";
import { getDetails } from "../../actions/user.actions";
import Profile from "./Profile.component";

class ProfileContainer extends Component {
  static propTypes = {
    dispatch: func,
    email: string,
    getDetails: func,
    id: number,
    login: string
  };

  constructor(props) {
    super(props);
    this.props.getDetails().catch(err => {
      if (!err.response) {
        toast.warn("Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem.");
      } else {
        toast.error("Nie można pobrać danych.");
      }
    });

    this.props.dispatch(reset("editDetailsModalForm"));
    this.props.dispatch(reset("changePasswordModalForm"));
  }

  componentDidMount = () => {
    this.props.getDetails().catch(err => {
      if (!err.response) {
        toast.warn("Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem.");
      } else {
        toast.error("Nie można pobrać danych.");
      }
    });
  };

  render() {
    return (
      <Profile
        email={this.props.email}
        login={this.props.login}
        id={this.props.id}
      />
    );
  }
}

const mapStateToProps = state => ({
  email: getEmail(state),
  login: getLogin(state),
  id: getId(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDetails: bindActionCreators(getDetails, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
);
