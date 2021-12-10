import React, { useEffect } from "react";
import { LOCALSTORAGE_USER_ID } from "../constant/contants";
import { getStorageData } from "../services/storage";
import { useUserContext } from "../services/user-context";
import ProfileView from "./ProfileView";
import LoginPageView from "./LogInPageView";

const HomeView = (props) => {
  const { state, dispatch } = useUserContext();

  useEffect(() => {
    getStorageData(LOCALSTORAGE_USER_ID).then((v) => {
      console.log(v);
      if (v !== null) {
        dispatch({
          type: "SET_LOGIN",
          userId: v,
          isLoggedIn: true,
        });
      }
    });
  }, []);

  return state.isLoggedIn ? <ProfileView /> : <LoginPageView />;
};
export default HomeView;
