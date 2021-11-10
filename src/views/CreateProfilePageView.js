import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet, TextInput} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import {CustomButton} from "../component/CustomButton";


export const CreateProfilePageView = (props) => {

   /* const { t, i18n } = useTranslation();

    i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr"); */

    return (
        <View>
            <Header/>
            <View style={styles.screen}>
                <Text style={styles.title}>createAccount</Text>
                <TextInput placeholder={"pseudo"} placeholderTextColor={"darkgreen"} style={styles.input}/>
                <TextInput placeholder={"pass"} placeholderTextColor={"darkgreen"} style={styles.input}/>
                <TextInput placeholder={"email"} placeholderTextColor={"darkgreen"} style={styles.input}/>
                <TextInput placeholder={"confirmPass"} placeholderTextColor={"darkgreen"} style={styles.input}/>
                <CustomButton onPress={(event) => props.navigation.navigate("Profile")}>create</CustomButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        padding: 50,
        paddingTop : 15,
    },
    title : {
        fontSize: 16,
        fontWeight: "700",
        color: "darkgreen",
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        height: 30,
        borderBottomColor: 'darkgreen',
        borderBottomWidth: 1,
        marginVertical: 10,
        marginBottom: 20,

    },
    text : {
        color : 'darkgreen',
        fontSize : 20,
    },
});

export default CreateProfilePageView;