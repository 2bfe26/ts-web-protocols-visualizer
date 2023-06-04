import { VParsedStep } from "../App.types";

export type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_DONE"; payload: boolean }
  | { type: "RESET"; payload: State };

export type State = {
  steps: VParsedStep[];
  stepCurrent: VParsedStep | null;
  stepCurrentIndex: number;
  stepPrev: VParsedStep | null;
  stack: VParsedStep[];
  done: boolean;
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        stepPrev: state.stepCurrent,
        stepCurrent: state.steps[state.stepCurrentIndex + 1],
        stepCurrentIndex: state.stepCurrentIndex + 1,
        stack: [...state.stack, state.steps[state.stepCurrentIndex + 1]],
      };

    case "PREV_STEP":
      return {
        ...state,
        stepPrev: state.stepCurrent,
        stepCurrent: state.steps[state.stepCurrentIndex - 1],
        stepCurrentIndex: state.stepCurrentIndex - 1,
        stack: [...state.stack, state.steps[state.stepCurrentIndex - 1]],
      };

    case "SET_STEP":
      return {
        ...state,
        stepPrev: state.stepCurrent,
        stepCurrent: state.steps[action.payload],
        stepCurrentIndex: action.payload,
        stack: [...state.stack, state.steps[action.payload]],
      };

    case "SET_DONE":
      return { ...state, done: action.payload };

    case "RESET":
      return action.payload;

    default:
      return state;
  }
}
