import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import Button from "react-native-web/dist/exports/Button";


export const QRcodePage = () => {
    return (
        <View>
            <Header/>
            <Button
                onPress={() => console.log("go to external webpage")}
                title={"htpps://"}/>
        </View>
    );
};