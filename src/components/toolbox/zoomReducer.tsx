export enum ZoomActionKind {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  SET = "SET",
}

// An interface for our actions
export interface ZoomAction {
  type: ZoomActionKind;
  payload: number;
}

// An interface for our state
export interface ZoomState {
  zoomLevel: number;
}

function zoomReducer(state: ZoomState, action: ZoomAction) {
  const { type, payload } = action;

  switch (type) {
    case ZoomActionKind.INCREASE:
      if (state.zoomLevel < 200) {
        return {
          zoomLevel: state.zoomLevel + payload,
        };
      }
      break;
    case ZoomActionKind.DECREASE:
      if (state.zoomLevel > 25) {
        return {
          zoomLevel: state.zoomLevel - payload,
        };
      }
      break;
    case ZoomActionKind.SET:
      return {
        zoomLevel: payload,
      };
  }

  // If no action is taken within the switch cases, return the current state.
  return state;
}

export default zoomReducer;
