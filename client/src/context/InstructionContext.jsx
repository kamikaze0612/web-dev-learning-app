/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const InstructionContext = createContext();

const initialState = {
  data: null,
  isLoading: false,
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
      };
  }
};

export default function InstructionProvider({ children }) {
  const [{ data, isLoading }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchSteps() {
      try {
        dispatch({ type: "data/loading" });
        const res = await fetch(`http://localhost:3000/steps`);
        const data = await res.json();

        dispatch({ type: "data/loaded", payload: data });
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong!");
      }
    }

    fetchSteps();
  }, []);

  return (
    <InstructionContext.Provider value={{ data, isLoading }}>
      {children}
    </InstructionContext.Provider>
  );
}

export function useInstruction() {
  const context = useContext(InstructionContext);
  return context;
}
