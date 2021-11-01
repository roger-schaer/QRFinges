import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import Button from "react-native-web/dist/exports/Button";


export const LogInPage = () => {
    return (
        <View>
            <Header/>
                <Button
                onPress={() => console.log("go to Profile")}
                title={"Se connecter"}/>
                <Text/>
                <Button
                onPress={()=> console.log("go to CreateProfilePage")}
                title={"S'inscrire"}/>
        </View>
    );
};