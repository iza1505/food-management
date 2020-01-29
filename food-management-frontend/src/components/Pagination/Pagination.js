import React from "react";
import { array, func, number } from "prop-types";
import _ from "lodash";
import { withTranslation } from "react-i18next";

const renderInput = ({
  currentPage,
  handlePagination,
  pageCount,
  paginationElem,
  t
}) => {
  return (
    <div className="center-align-elem">
      <nav aria-label="...">
        <ul className="pagination">
          <li
            className={
              _.isEqual(Number(1), Number(currentPage))
                ? "page-item disabled"
                : "page-item"
            }
          >
            <a
              href="# "
              className="page-link"
              onClick={() => handlePagination(currentPage - 1)}
              tabIndex="-1"
            >
              {t("pagination.previous")}
            </a>
          </li>
          {paginationElem.map(page => (
            <li
              className={
                _.isEqual(Number(page), Number(currentPage))
                  ? "page-item active"
                  : "page-item"
              }
              key={page}
            >
              <a
                href="# "
                className="page-link"
                onClick={() => handlePagination(page)}
              >
                {page}
              </a>
            </li>
          ))}
          <li
            className={
              _.gte(Number(currentPage), Number(pageCount))
                ? "page-item disabled"
                : "page-item"
            }
          >
            <a
              href="# "
              className="page-link"
              onClick={() => handlePagination(Number(currentPage) + Number(1))}
            >
              {t("pagination.next")}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

renderInput.propTypes = {
  currentPage: number,
  handlePagination: func,
  pageCount: number,
  paginationElem: array
};

export default withTranslation("common")(renderInput);
