import styles from "./toolbox.module.css";

const ToolBox = () => {
  const zoomSelectionOptions: number[] = [50, 75, 100, 125, 150, 200];

  return (
    <div className={`${styles['toolbox-container']} p-3`}>
        <h3>Tree Layout</h3>
      <div className={styles.toolbox}>
        <button className="btn btn-outline-primary"><i className="bi bi-dash-lg"></i></button>
        <select className="form-select mx-2" id="">
          <option defaultValue="0">Select Zoom</option>
          {zoomSelectionOptions.map((option) => (
            <option key={option} value={option}>{option}%</option>
          ))}
        </select>
        <button className="btn btn-outline-primary"><i className="bi bi-plus-lg"></i></button>
      </div>
    </div>
  );
};
export default ToolBox;
