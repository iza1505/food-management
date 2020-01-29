import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object, number, string } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";
import { withTranslation } from "react-i18next";

import {
  getPageCount,
  getCurrentPage,
  getIngredients,
  getFethingIngredients,
  getError
} from "../../selectors/ingredients.selectors";

import { getRole } from "../../selectors/user.selectors";
import {
  resetCurrentPageOnSubmit,
  resetIngredients,
  getIngredientsAdmin,
  deleteIngredient,
  updateIngredient
} from "../../actions/ingredients.actions";
import Ingredients from "./Ingredients.component";

class IngredientsContainer extends Component {
  static propTypes = {
    currentPage: number,
    deleteIngredient: func,
    error: string,
    fetching: bool,
    getIngredientsAdmin: func,
    history: object,
    ingredients: array,
    pageCount: number,
    resetCurrentPageOnSubmit: func,
    resetIngredients: func,
    t: func,
    updateIngredient: func,
    userRole: string
  };

  state = {
    paginationElem: []
  };

  constructor(props) {
    super(props);
    this.props.resetIngredients();
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
        .getIngredientsAdmin(url)
        .then(() => {
          this.createPagination();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t("toastInfo.cantDownloadProducts"));
          }
        });
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

  handleActiveIngredient = (id, version) => {
    this.props
      .updateIngredient(id, version)
      .then(() => {
        this.props.getIngredientsAdmin(this.createUrl()).catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t("toastInfo.cantDownloadProducts"));
          }
        });
        toast.info(this.props.t("toastInfo.productActivated"));
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t(this.props.error));
        }
      });
  };

  handleDeleteIngredient = id => {
    this.props
      .deleteIngredient(id)
      .then(() => {
        toast.info(this.props.t("toastInfo.productHasBeenDeleted"));
        this.props.getIngredientsAdmin(this.createUrl()).catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t("toastInfo.cantDownloadProducts"));
          }
        });
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t(this.props.error));
        }
      });
  };

  render() {
    return (
      <Ingredients
        pageCount={this.props.pageCount}
        ingredients={this.props.ingredients}
        currentPage={this.props.currentPage}
        handlePagination={this.handlePagination}
        paginationElem={this.state.paginationElem}
        handleClick={this.handleClick}
        handleActiveIngredient={this.handleActiveIngredient}
        handleDeleteIngredient={this.handleDeleteIngredient}
        fetching={this.props.fetching}
        url={this.createUrl()}
        userRole={this.props.userRole}
      />
    );
  }
}

const mapDispatchToProps = {
  getIngredientsAdmin,
  resetIngredients,
  resetCurrentPageOnSubmit,
  deleteIngredient,
  updateIngredient
};

const mapStateToProps = state => ({
  pageCount: getPageCount(state),
  ingredients: getIngredients(state),
  currentPage: getCurrentPage(state),
  fetching: getFethingIngredients(state),
  error: getError(state),
  userRole: getRole(state)
});

export default withTranslation("common")(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(IngredientsContainer))
);
