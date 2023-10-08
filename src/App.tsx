import "./App.css";
import { useReducer } from "react";
import ToolBox from "./components/toolbox/toolbox";
import TreeDiagram from "./components/treeDiagram/treeDiagram";
import zoomReducer from "./components/toolbox/zoomReducer";

function App() {
  const [state, dispatch] = useReducer(zoomReducer, { zoomLevel: 100 });

  return (
    <main className="container">
      <ToolBox zoomState={state} dispatch={dispatch} />
      <TreeDiagram zoomState={state} />
    </main>
  );
}

export default App;
