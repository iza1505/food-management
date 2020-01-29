import React, { Component } from "react";
import { connect } from "react-redux";
import { func, number, string } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

import { getLogin, getEmail, getId } from "../../selectors/user.selectors";
import { getDetails } from "../../actions/user.actions";
import Profile from "./Profile.component";

class ProfileContainer extends Component {
  static propTypes = {
    dispatch: func,
    email: string,
    getDetails: func,
    id: number,
    login: string,
    t: func
  };

  constructor(props) {
    super(props);
    this.props.getDetails().catch(err => {
      if (!err.response) {
        toast.warn(this.props.t("toastInfo.unreachableServer"));
      } else {
        toast.error(this.props.t("toastInfo.cantDownloadData"));
      }
    });

    this.props.dispatch(reset("editDetailsModalForm"));
    this.props.dispatch(reset("changePasswordModalForm"));
  }

  componentDidMount = () => {
    this.props.getDetails().catch(err => {
      if (!err.response) {
        toast.warn(this.props.t("toastInfo.unreachableServer"));
      } else {
        toast.error(this.props.t("toastInfo.cantDownloadData"));
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

export default withTranslation("common")(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer))
);
