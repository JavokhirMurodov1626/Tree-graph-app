import { TreeNodeModel } from "../../models/treeNode";
import React, { ReactNode, useState } from "react";
import "./treeNode.css";
import InputNode from "../inputNode/inputNode";

interface TreeNodeProps {
  title: string;
  children: ReactNode;
  onAddChild: (label: string) => void;
  layer: number;
  nodeChildren: TreeNodeModel[];
}

const getColorForLayer = (layer: number): string => {
  // For simplicity, we'll use a predefined set of colors.
  const colors = [
    "rgba(255, 87, 51,0.3)",
    "rgba(51, 255, 110,0.3)",
    "rgba(51, 122, 255,0.3)",
    "rgba(255, 51, 233,0.3)",
    "rgba(248, 255, 51,0.3)",
  ];
  return colors[layer % colors.length];
};

const TreeNode: React.FC<TreeNodeProps> = ({
  title,
  children,
  onAddChild,
  layer,
  nodeChildren,
}) => {
  const [showInput, setShowInput] = useState(false);

  const nodeColor = getColorForLayer(layer);

  const addInputNode = () => {
    setShowInput(true);
  };

  const closeInputNode = () => {
    setShowInput(false);
  };

  return (
    <li>
      <div
        style={{ backgroundColor: nodeColor }}
        className={`${layer === 0 ? "root-node" : ""} node`}
      >
        <span className="label">{title}</span>
        <div className="btn-group">
          <button onClick={addInputNode} type="button" className="button">
            <i
              className="bi bi-plus-circle-fill"
              style={{ fontSize: "16px", color: "lightgrey" }}
            ></i>
          </button>
          <button type="button" className="button button-edit">
            <i
              className="bi bi-pencil-square"
              style={{ fontSize: "16px", color: "lightgrey" }}
            ></i>
          </button>
          <button type="button" className="button button-close">
            <i
              className="bi bi-x-circle-fill"
              style={{ fontSize: "16px", color: "red" }}
            ></i>
          </button>
        </div>
      </div>
      {(nodeChildren.length > 0 || showInput) && (
        <ul>
          {children}
          {showInput && (
            <li>
              <InputNode
                closeInputNode={closeInputNode}
                addInputNode={onAddChild}
              />
            </li>
          )}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
