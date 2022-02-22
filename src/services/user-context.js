import React, { createContext, useEffect, useReducer } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

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
    isLoggedIn: null,
    userId: "",
    email: "",
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        if (userAuth !== null) {
          dispatch({
            type: "SET_LOGIN",
            userId: userAuth.uid,
            email: userAuth.email,
            isLoggedIn: true,
          });
        } else {
          dispatch({ type: "IS_LOGGED_OFF" });
        }

        return () => unsubscribe();
      },
      (e) => {
        console.log("ERROR ON AUTH STATE CHANGE", e);
      }
    );
  }, []);

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  return React.useContext(UserContext);
}

export { UserProvider, useUserContext };
