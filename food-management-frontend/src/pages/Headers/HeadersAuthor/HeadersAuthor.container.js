import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func, object, number } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";
import { withTranslation } from "react-i18next";

import {
  getPageCount,
  getRecipesHeaders,
  getCurrentPage
} from "../../../selectors/recipeHeaders.selectors";

import {
  getHeaders,
  resetHeaders,
  resetCurrentPageOnSubmit
} from "../../../actions/recipeHeaders.actions";

import { deleteRecipe } from "../../../actions/recipe.actions";
import HeadersAuthor from "./HeadersAuthor.component";

class HeadersAuthorContainer extends Component {
  static propTypes = {
    currentPage: number,
    deleteRecipe: func,
    getHeaders: func,
    history: object,
    pageCount: number,
    recipeHeaders: array,
    resetCurrentPageOnSubmit: func,
    resetHeaders: func,
    t: func
  };

  state = {
    paginationElem: []
  };

  constructor(props) {
    super(props);
    this.props.resetHeaders();
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
        const str = parsed.sortBy.replace(/"/g, "");
        url = url + "&sortBy=" + str;
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
        const str = parsed.sortBy.replace(/"/g, "");
        url = url + "&sortBy=" + str;
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
        const str = parsed.sortBy.replace(/"/g, "");
        url = url + "&sortBy=" + str;
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
        .getHeaders(url)
        .then(() => {
          this.createPagination();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t("toastInfo.cantDownloadRecipes"));
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

  handleDeleteRecipe = recipeId => {
    this.props
      .deleteRecipe(recipeId)
      .then(() => {
        toast.info(this.props.t("toastInfo.recipeHasBeedDeleted"));
        this.props.getHeaders(this.createUrl());
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t("toastInfo.cantDownloadRecipes"));
        }
      });
  };

  redirectToEditRecipe = id =>
    this.props.history.push("/recipes/" + id + "/edit");

  handleEditRecipe = id => {
    return this.redirectToEditRecipe(id);
  };

  render() {
    return (
      <HeadersAuthor
        pageCount={this.props.pageCount}
        recipeHeaders={this.props.recipeHeaders}
        currentPage={this.props.currentPage}
        handlePagination={this.handlePagination}
        paginationElem={this.state.paginationElem}
        handleClick={this.handleClick}
        handleDeleteRecipe={this.handleDeleteRecipe}
        handleEditRecipe={this.handleEditRecipe}
      />
    );
  }
}

const mapDispatchToProps = {
  deleteRecipe,
  getHeaders,
  resetHeaders,
  resetCurrentPageOnSubmit
};

const mapStateToProps = state => ({
  pageCount: getPageCount(state),
  recipeHeaders: getRecipesHeaders(state),
  currentPage: getCurrentPage(state)
});

export default withTranslation("common")(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HeadersAuthorContainer)
  )
);
