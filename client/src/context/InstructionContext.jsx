/* eslint-disable react/prop-types */
import axios from "axios";
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

        const { data } = await axios.get(
          "http://localhost:3000/api/v1/instructions",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        // const data = await res.json();

        dispatch({ type: "data/loaded", payload: data.data.instructions });
        // dispatch({ type: "data/loaded", payload: data });
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong!");
      }
    }

    fetchSteps();
  }, [dispatch]);

  return (
    <InstructionContext.Provider value={{ data, isLoading, dispatch }}>
      {children}
    </InstructionContext.Provider>
  );
}

export function useInstruction() {
  const context = useContext(InstructionContext);
  return context;
}
