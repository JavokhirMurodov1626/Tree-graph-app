import styles from "./nodeInput.module.css";
import { useState,useEffect } from "react";

interface InputNodeProps {
  label?: string;
  isEditing?: boolean;
  closeInputNode: () => void;
  addInputNode: (label: string) => void;
  changeEditMode?: () => void;
  editInputNode?: (label: string) => void;
}

const InputNode: React.FC<InputNodeProps> = ({
  label,
  isEditing,
  closeInputNode,
  addInputNode,
  changeEditMode,
  editInputNode,
}) => {
  const [nodeLabel, setNodeLabel] = useState("");

  const onNodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nodeLabel) {
      alert("Input is empty!!");
      return;
    }
    if (!isEditing) {
      addInputNode(nodeLabel);
      closeInputNode();
    } else {
      if (editInputNode) {
        editInputNode(nodeLabel);
      }
    }

    if (changeEditMode) changeEditMode();
  };

  useEffect(() => {

    if (isEditing) setNodeLabel(label || "");
  }, [isEditing, label]);

  return (
    <form onSubmit={submit} className={styles["node-input-form"]}>
      <input
        autoFocus
        defaultValue={nodeLabel}
        type="text"
        placeholder="Category Name"
        className="form-control"
        onInput={onNodeInputChange}
      />
      <div className={styles["node-input-btn-group"]}>
        <button
          type="button"
          className="button button-close"
          onClick={closeInputNode}
        >
          <i
            onClick={changeEditMode}
            className="bi bi-x-circle-fill"
            style={{ fontSize: "16px", color: "orange" }}
          ></i>
        </button>
        <button type="submit" className="button button-close">
          <i
            className="bi bi-check-circle-fill"
            style={{ fontSize: "16px", color: "green" }}
          ></i>
        </button>
      </div>
    </form>
  );
};

export default InputNode;
