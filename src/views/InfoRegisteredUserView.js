import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";


export const InfoRegisteredUserView = (props) => {
    return (
        <View>
            <Header/>
            <Text> Toutes mes infos perso </Text>
            <Button
                onPress={() => props.navigation.navigate('Profile') }
                title={"Allez vers le GPS/QRScanner"}/>
            <Button
                onPress={() => props.navigation.navigate('Contact') }
                title={"Nous contacter"}/>
            <View>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </View>
        </View>
    );
};
export default InfoRegisteredUserView;
