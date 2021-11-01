import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import {Profile} from "./Profile";
import {ContactPage } from "./ContactPage";
import {CreateProfilePage} from "./CreateProfilePage";
import {InfoRegisteredUser} from "./InfoRegisteredUser";
import {InfoNonRegisteredUser} from "./InfoNonRegisteredUser";
import {LogInPage} from "./LogInPage";
import {QRcodePage} from "./QRcodePage";


const Home = (props) => {
 // return <ContactPage />;
 // return <CreateProfilePage/>;
  return <InfoRegisteredUser/>;
 // return <InfoNonRegisteredUser/>;
 //  return <LogInPage/>;
 //   return <QRcodePage/>;
};

export default Home;
