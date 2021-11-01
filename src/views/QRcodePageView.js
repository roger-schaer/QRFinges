import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";


export const QRcodeView = (props) => {
    return (
        <View>
            <Header/>
            <Text> Zone de scanning du QR code </Text>
            <Button
                onPress={() => console.log("go to external webpage")}
                title={"lien htpps:// du QR code"}/>
            <footer>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </footer>
        </View>
    );
};

export default QRcodeView;