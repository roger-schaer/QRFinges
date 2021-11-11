import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";
import {Logo} from "../component/Logo";
import {CustomButton} from "../component/CustomButton";
import {CustomButtonNoBorders} from "../component/CustomButtonNoBorders";




export const LoginPageView = (props) => {

    // Translation
    const { t, i18n } = useTranslation();
    i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr");



    return (
            <View style={styles.screen}>
                <Logo style={styles.logoContainer}/>
            <Text style={styles.text}>{t("welcomePhrase")}</Text>
            <TextInput placeholder={t("email")} placeholderTextColor={"darkgreen"} style={styles.input}/>
            <TextInput placeholder={t("pass")} placeholderTextColor={"darkgreen"} style={styles.input}/>

                <CustomButton onPress={(event)=> props.navigation.navigate('Profile')}>{t("connect")}</CustomButton>

                <CustomButtonNoBorders onPress={(event)=> props.navigation.navigate('CreateProfile')}>{t("subscribe")}</CustomButtonNoBorders>
            </View>

    );
};



const styles = StyleSheet.create({
    screen: {
        padding: 50,
       paddingTop : 0,
        backgroundColor : "#f5f5f5",
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
       // placeholderTextColor : 'darkgreen',
    },
    text : {
        color : 'darkgreen',
        fontSize : 20,
    },
    logoContainer : {
        marginBottom : 20,
        paddingBottom : 30,
    },
});

export default LoginPageView;
