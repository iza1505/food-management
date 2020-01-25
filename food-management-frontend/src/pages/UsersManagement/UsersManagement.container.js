import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object, number } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";

import {
  getUsers,
  getFetchingUsers,
  getPageCount,
  getCurrentPage
} from "../../selectors/users.selectors";

import {
  getUsers as getUsersAction,
  changeAccountStatus,
  resetCurrentPageOnSubmit,
  resetUsers
} from "../../actions/users.actions";

import { getId } from "../../selectors/user.selectors";
import { getDetails } from "../../actions/user.actions";

import UsersManagement from "./UsersManagement.component";

class UsersManagementContainer extends Component {
  static propTypes = {
    changeAccountStatus: func,
    currentPage: number,
    fetching: bool,
    getDetails: func,
    getUsersAction: func,
    history: object,
    pageCount: number,
    resetCurrentPageOnSubmit: func,
    resetUsers: func,
    userId: number,
    users: array
  };

  state = {
    paginationElem: [],
    usersCopy: []
  };

  constructor(props) {
    super(props);
    this.props.resetUsers();
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.props.getDetails();
  }

  reloadData = newPage => {
    const parsed = querySearch.parse(this.props.location.search);
    if (!_.isEmpty(parsed)) {
      let url =
        window.location.pathname +
        "?elementsOnPage=" +
        parsed.elementsOnPage +
        "&currentPage=" +
        newPage;

      if (parsed.sortBy) {
        url = url + "&sortBy=" + parsed.sortBy.replace(/"/g, "");
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }
      this.props.history.push(url);
    }
  };

  createUrl() {
    const defaultUrl = window.location.pathname;
    const parsed = querySearch.parse(this.props.location.search);
    if (!_.isEmpty(parsed)) {
      let url =
        window.location.pathname + "?elementsOnPage=" + parsed.elementsOnPage;

      if (parsed.sortBy) {
        url = url + "&sortBy=" + parsed.sortBy.replace(/"/g, "");
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }

      if (parsed.currentPage) {
        url = url + "&currentPage=" + parsed.currentPage;
      } else {
        url = url + "&currentPage=1";
      }

      return url;
    }
    return defaultUrl;
  }

  componentDidMount() {
    const parsed = querySearch.parse(this.props.location.search);
    if (!_.isEmpty(parsed)) {
      let url =
        window.location.pathname + "?elementsOnPage=" + parsed.elementsOnPage;

      if (parsed.sortBy) {
        url = url + "&sortBy=" + parsed.sortBy.replace(/"/g, "");
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }

      if (parsed.currentPage) {
        url = url + "&currentPage=" + parsed.currentPage;
      } else {
        url = url + "&currentPage=1";
      }

      this.props
        .getUsersAction(url)
        .then(() => {
          this.setState({ usersCopy: this.props.users });
          this.createPagination();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(
              "Server is unreachable. Check your internet connection."
            );
          } else {
            toast.error("Can't get users.");
          }
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fetching !== nextProps.fetching) {
      return true;
    }
    if (this.state.usersCopy !== nextProps.users) {
      this.setState({ usersCopy: this.props.users });
      return true;
    } else {
      if (this.state.paginationElem !== nextState.paginationElem) {
        return true;
      }
      return false;
    }
  }

  createPagination() {
    let tempPagiElems = [];
    for (
      let i = this.props.currentPage - 10;
      i < Number(this.props.currentPage) + 10;
      i++
    ) {
      if (i > 0 && i <= Number(this.props.pageCount)) {
        tempPagiElems.push(i);
      }
    }
    this.setState({ paginationElem: tempPagiElems });
  }

  handlePagination = page => {
    this.reloadData(page);
  };

  handleClick = e => {
    if (e.target.name === "submit_button") {
      this.props.resetCurrentPageOnSubmit();
    }
  };

  handleChangeStatus(id, version, e) {
    this.props
      .changeAccountStatus(id, e.target.checked, version)
      .then(() => {
        this.props.getUsersAction(this.createUrl());
        toast.info("User status has been changed.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Cannot change user status.");
        }
      });
  }

  render() {
    return (
      <UsersManagement
        pageCount={this.props.pageCount}
        users={this.state.usersCopy}
        currentPage={this.props.currentPage}
        handlePagination={this.handlePagination}
        paginationElem={this.state.paginationElem}
        handleClick={this.handleClick}
        handleChangeStatus={this.handleChangeStatus}
        fetching={this.props.fetching}
        userId={this.props.userId}
      />
    );
  }
}

const mapDispatchToProps = {
  getDetails,
  getUsersAction,
  resetUsers,
  resetCurrentPageOnSubmit,
  changeAccountStatus
};

const mapStateToProps = state => ({
  pageCount: getPageCount(state),
  users: getUsers(state),
  currentPage: getCurrentPage(state),
  fetching: getFetchingUsers(state),
  userId: getId(state)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersManagementContainer)
);
