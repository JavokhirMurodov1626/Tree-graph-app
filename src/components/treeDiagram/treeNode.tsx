import styles from "./treeNode.module.css";
import React, { ReactNode } from "react";
import { TreeNodeModel } from "../../models/treeNode";

interface TreeNodeProps  {
    title:string,
  children?: ReactNode;
  onAddChild: () => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ title, children, onAddChild }) => {
  return (
    <div>
      <div className={styles.node}>
        <p
          className={`${styles["node-text"]} m-0`}
          style={{ border: "1px solid lightgrey" }}
        >
          {title}
        </p>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            onClick={onAddChild}
            type="button"
            className={`${styles.button}`}
          >
            <i
              className="bi bi-plus-circle-fill"
              style={{ fontSize: "20px", color: "lightgrey" }}
            ></i>
          </button>
          <button type="button" className={`${styles.button}`}>
            <i
              className="bi bi-pencil-square"
              style={{ fontSize: "20px", color: "lightgrey" }}
            ></i>
          </button>
          <button type="button" className={`${styles.button} `}>
            <i
              className="bi bi-x-circle-fill"
              style={{ fontSize: "20px", color: "red" }}
            ></i>
          </button>
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default TreeNode;
