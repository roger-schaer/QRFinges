import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";


export const CreateProfilePageView = (props) => {

    const { t, i18n } = useTranslation();

    i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr");

    return (
        <View>
            <Header/>
            <Text>{t("createAccount")}</Text>
            <Button
                onPress={() => { props.navigation.navigate("Profile"),
                                    console.log("Go to Profile")} }
                title={"Valider & se connecter"}/>
            <View>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </View>
        </View>
    );
};

export default CreateProfilePageView;