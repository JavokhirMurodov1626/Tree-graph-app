import { ChangeEvent } from "react";
import styles from "./toolbox.module.css";
import { ZoomActionKind, ZoomState, ZoomAction } from "./zoomReducer";

interface ToolBoxProps {
  zoomState: ZoomState;
  dispatch: (action: ZoomAction) => void;
}

const ToolBox: React.FC<ToolBoxProps> = ({ zoomState, dispatch }) => {
  const zoomSelectionOptions: number[] = [25, 50, 75, 100, 125, 150, 175, 200];

  return (
    <div className={`${styles["toolbox-container"]} p-3`}>
      <h3>Tree Layout</h3>
      <div className={styles.toolbox}>
        <button
          disabled={zoomState.zoomLevel === 25 ? true : false}
          className="btn btn-outline-primary"
          onClick={() =>
            dispatch({ type: ZoomActionKind.DECREASE, payload: 25 })
          }
        >
          <i className="bi bi-dash-lg"></i>
        </button>
        <select
          className="form-select mx-2"
          id=""
          value={zoomState.zoomLevel}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            dispatch({ type: ZoomActionKind.SET, payload: +e.target.value })
          }
        >
          {zoomSelectionOptions.map((option) => (
            <option key={option} value={option}>
              {option}%
            </option>
          ))}
        </select>
        <button
          disabled={zoomState.zoomLevel === 200 ? true : false}
          className="btn btn-outline-primary"
          onClick={() =>
            dispatch({ type: ZoomActionKind.INCREASE, payload: 25 })
          }
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  );
};
export default ToolBox;
