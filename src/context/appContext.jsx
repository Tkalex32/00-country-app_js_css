import { createContext, useReducer } from "react";

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COUNTRIES":
      return {
        ...state,
        countries: [...action.payload],
      };
    case "ADD_COUNTRY":
      return {
        ...state,
        country: { ...action.payload },
      };
    case "ADD_FILTERED":
      return {
        ...state,
        filtered: [...action.payload],
      };
    case "CHANGE_REGION":
      return {
        ...state,
        region: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  countries: [],
  country: {},
  filtered: [],
  region: "init",
};

export const Context = createContext();

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider
      value={{
        countries: state.countries,
        country: state.country,
        filtered: state.filtered,
        region: state.region,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
