import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func, object, number, string } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";

import {
  getPageCount,
  getCurrentPage,
  getIngredients
} from "../../selectors/ingredients.selectors";

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
    getIngredientsAdmin: func,
    history: object,
    ingredients: array,
    pageCount: number,
    resetCurrentPageOnSubmit: func,
    resetIngredients: func,
    updateIngredient: func
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
            toast.warn(
              "Server is unreachable. Check your internet connection."
            );
          } else {
            toast.error("Can't get recipes headers.");
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
        this.props
          .getIngredientsAdmin(
            window.location.pathname + window.location.search
          )
          .catch(err => {
            if (!err.response) {
              toast.warn(
                "Server is unreachable. Check your internet connection."
              );
            } else {
              toast.error("Can't get ingredients.");
            }
          });
        toast.info("Ingredient activated.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Can't update ingredient.");
        }
      });
  };

  handleDeleteIngredient = id => {
    this.props
      .deleteIngredient(id)
      .then(() => {
        toast.info("Ingredient has been deleted.");
        this.props
          .getIngredientsAdmin(
            window.location.pathname + window.location.search
          )
          .catch(err => {
            if (!err.response) {
              toast.warn(
                "Server is unreachable. Check your internet connection."
              );
            } else {
              toast.error("Can't get ingredients.");
            }
          });
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
        } else {
          toast.error("Can't delete ingredients.");
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
  currentPage: getCurrentPage(state)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IngredientsContainer)
);
