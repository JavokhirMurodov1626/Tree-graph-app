import styles from "./nodeInput.module.css";
import { useState, useRef, useEffect } from "react";

interface InputNodeProps {
  closeInputNode: () => void;
  addInputNode: (label: string) => void;
}

const InputNode: React.FC<InputNodeProps> = ({
  closeInputNode,
  addInputNode,
}) => {
  const [nodeLabel, setNodeLabel] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);

  const onNodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!nodeLabel){
      alert("Input is empty!!");
      return;
    };
    addInputNode(nodeLabel);
    closeInputNode();
  };

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={submit} className={styles["node-input-form"]}>
      <input
        ref={focusRef}
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
