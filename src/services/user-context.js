import React, { createContext } from "react";

// attention au null

export const UserContext = createContext({});

function loginReducer(state, action) {
  switch (action.type) {
    case "IS_LOGGED_OFF": {
      return { ...state, isLoggedIn: false, user: null, userId: null };
    }

    case "IS_LOGGED_ERROR": {
      return {
        ...state,
        isLoggedIn: false,
        email: null,
        error: action.error,
        userId: null,
      };
    }

    case "SET_LOGIN": {
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        isLoggedIn: action.isLoggedIn,
      };
    }

    default: {
      return state;
    }
  }
}

function UserProvider({ children }) {
  const initialState = {
    isLoggedIn: false,
    userId: "",
    email: "",
  };

  const [state, dispatch] = React.useReducer(loginReducer, initialState);

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  return React.useContext(UserContext);
}

export { UserProvider, useUserContext };
