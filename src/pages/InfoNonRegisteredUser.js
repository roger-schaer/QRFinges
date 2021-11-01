import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import Button from "react-native-web/dist/exports/Button";


export const InfoNonRegisteredUser = () => {
    return (
        <View>
            <Header/>
            <Button
                onPress={() => console.log("Go to Profile")}
                title={"Je crée mon compte"}/>
                <Text/>
               <Button
                   onPress={() => console.log("Contact page")}
                   title={"J'ai encore des question"}/>

        </View>
    );
};