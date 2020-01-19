import React from "react";
import { array, bool, number, object, string, oneOfType } from "prop-types";

import styles from "./LabelWithData.module.scss";

const LabelWithData = ({
  color,
  dataColor,
  label,
  children,
  loading = false
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-3">
          <label
            className={styles["label-bold"]}
            htmlFor="row-content"
            style={{ color: color }}
          >
            {label}
          </label>
        </div>
        <div name="row-content">
          {loading ? (
            <div />
          ) : (
            <span
              className={styles["label-data"]}
              style={{ color: dataColor }}
            >
              {children}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

LabelWithData.propTypes = {
  children: oneOfType([array, object, string, number]),
  color: string,
  dataColor: string,
  label: string.isRequired,
  loading: bool
};

export default LabelWithData;
