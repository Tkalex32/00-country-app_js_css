import { createContext, useReducer } from "react";

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COUNTRIES":
      return {
        ...state,
        countries: [...state.countries, action.payload],
      };
    /* case "ADD_FILTERED":
      return {
        ...state,
        filtered: [...state.filtered, action.payload],
      }; */
    default:
      return state;
  }
};

const initialState = {
  countries: [],
  filtered: [],
};

export const Context = createContext();

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider
      value={{
        countries: state.countries,
        filtered: state.filtered,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
