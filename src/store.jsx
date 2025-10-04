import React, { useReducer } from "react";

export const Context = React.createContext(null);

const initialState = {
  store: {
    favorites: [],
    people: [],
    planets: [],
    vehicles: []
  },
  actions: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        store: {
          ...state.store,
          favorites: [...state.store.favorites, action.payload]
        }
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        store: {
          ...state.store,
          favorites: state.store.favorites.filter(f => f !== action.payload)
        }
      };
    case "SET_PEOPLE":
      return { ...state, store: { ...state.store, people: action.payload } };
    case "SET_PLANETS":
      return { ...state, store: { ...state.store, planets: action.payload } };
    case "SET_VEHICLES":
      return { ...state, store: { ...state.store, vehicles: action.payload } };
    default:
      return state;
  }
};

const injectContext = (PassedComponent) => {
  return (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
      addFavorite: (item) => dispatch({ type: "ADD_FAVORITE", payload: item }),
      removeFavorite: (item) => dispatch({ type: "REMOVE_FAVORITE", payload: item }),
      setPeople: (people) => dispatch({ type: "SET_PEOPLE", payload: people }),
      setPlanets: (planets) => dispatch({ type: "SET_PLANETS", payload: planets }),
      setVehicles: (vehicles) => dispatch({ type: "SET_VEHICLES", payload: vehicles }),
    };

    return (
      <Context.Provider value={{ store: state.store, actions }}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
};

export default injectContext;
