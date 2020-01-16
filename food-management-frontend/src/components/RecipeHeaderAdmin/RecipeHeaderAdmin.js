import React from "react";
import { bool, string } from "prop-types";

import styles from "./RecipeHeaderAdmin.module.scss";

const RecipeHeaderAdmin = ({
  active,
  waitingForAccept,
  toImprove,
  loading = false
}) => {
  return (
    <div style={{ alignItems: "center" }}>
      <div className="row">
        <div className="col-sm-2">
          <label className={styles["label-recipe"]} htmlFor="active">
            Active:
          </label>
        </div>
        <div name="active">
          {loading ? (
            <div />
          ) : (
            <span className={styles["label-data-recipe"]}>
              {/* {active} */}
              No
            </span>
          )}
        </div>

        <div className="col-sm-3">
          <label className={styles["label-recipe"]} htmlFor="waiting">
            Waiting for accept:
          </label>
        </div>
        <div name="waiting">
          {loading ? (
            <div />
          ) : (
            <span className={styles["label-data-recipe"]}>
              {/* {waitingForAccept} */}
              No
            </span>
          )}
        </div>

        <div className="col-sm-4">
          <label className={styles["label-recipe"]} htmlFor="toImprove">
            To improve:
          </label>
        </div>
        <div name="toImprove">
          {loading ? (
            <div />
          ) : (
            <span className={styles["label-data-recipe"]}>
              wszyswszystkowszystkowszystkowszystkowszyst
              kowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowsz
              ystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystko
              wszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszyst
              kowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszys
              tkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszyst
              kowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystko
              wszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkotko
            </span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <label className={styles["label-recipe"]} htmlFor="toImprove">
            To improve:
          </label>
        </div>
        <div name="toImprove">
          {loading ? (
            <div />
          ) : (
            <span className={styles["label-data-recipe"]}>
              wszyswszystkowszystkowszystkowszystkowszyst
              kowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowsz
              ystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystko
              wszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszyst
              kowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszys
              tkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszyst
              kowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystko
              wszystkowszystkowszystkowszystkowszystkowszystkowszystkowszystkotko
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

RecipeHeaderAdmin.propTypes = {
  active: string,
  loading: bool,
  toImprove: string,
  waitingForAccept: string
};

export default RecipeHeaderAdmin;
