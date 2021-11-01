import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export const ContactPageView = (props) => {
    return (
        <View>
            <Header/>
            <AntDesign name={"phone"} size={30}/>
            <AntDesign name={"mail"} size={30}/>
            <FontAwesome name={"address-book"} size={30}/>
            <footer>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </footer>
        </View>
    );
};

export default ContactPageView;