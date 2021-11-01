import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";


export const CreateProfilePageView = (props) => {
    return (
        <View>
            <Header/>
            <Button
                onPress={() => { props.navigation.navigate("Profile"),
                                    console.log("Go to Profile")} }
                title={"Valider & se connecter"}/>
        <footer>
            <Button title="Go back" onPress={() => props.navigation.goBack() } />
        </footer>
        </View>
    );
};

export default CreateProfilePageView;