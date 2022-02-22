import React, { useEffect } from "react";
import { getStorageData } from "../services/storage";
import { useUserContext } from "../services/user-context";
import ProfileView from "./ProfileView";
import LoginPageView from "./LogInPageView";
import * as Location from "expo-location";
import Loading from "../component/Loading";

const HomeView = () => {
  const { state } = useUserContext();

  return state.isLoggedIn !== null ? (
    state.isLoggedIn === true ? (
      <ProfileView />
    ) : (
      <LoginPageView />
    )
  ) : (
    <Loading />
  );
};
export default HomeView;
