/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const InstructionContext = createContext();

const initialState = {
  data: null,
  isLoading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "data/loading":
      return {
        ...state,
        isLoading: true,
      };

    case "data/loaded":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: "",
      };

    case "data/error":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default function InstructionProvider({ children }) {
  const [{ data, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <InstructionContext.Provider value={{ data, error, isLoading, dispatch }}>
      {children}
    </InstructionContext.Provider>
  );
}

export function useInstruction() {
  const context = useContext(InstructionContext);
  return context;
}
