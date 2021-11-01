import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import Button from "react-native-web/dist/exports/Button";


export const InfoRegisteredUser = () => {
    return (
        <View>
            <Header/>
            <Text> Ici le list des question </Text>
            <Button
                onPress={() => console.log("Call phone action")}
                title={"J'ai encore des question"}/>

        </View>
    );
};