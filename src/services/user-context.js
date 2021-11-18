import React, { createContext } from "react";

// attention au null

export const UserContext = createContext({});

function loginReducer(state, action) {
  switch (action.type) {
    case "IS_LOGGED_IN": {
      return { ...state, isLoggedIn: true };
    }

    case "IS_LOGGED_OFF": {
      return { ...state, isLoggedIn: false, userId: null };
    }

    case "IS_LOGGED_ERROR": {
      return { ...state, isLoggedIn: false, error: action.error, userId: null };
    }

    case "SET_LOGIN": {
      return { ...state, userId: action.userId, isLoggedIn: action.isLoggedIn };
    }

    default: {
      return state;
    }
  }
}

function UserProvider({ children }) {
  const initialState = {
    isLoggedIn: false,
    userId: "", //localStorage.getItem(USER_ID)
  };

  const [state, dispatch] = React.useReducer(loginReducer, initialState);

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  return React.useContext(UserContext);
}

export { UserProvider, useUserContext };
