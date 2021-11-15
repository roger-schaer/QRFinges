import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, Button} from "react-native";
import Header from "../component/Header";
import {useTranslation} from "react-i18next";
import {Logo} from "../component/Logo";
import {CustomButton} from "../component/CustomButton";
import {CustomButtonNoBorders} from "../component/CustomButtonNoBorders";
import {handleLogin} from "../services/firebase";

const LoginPageView = (props) => {
    // Translation
    const {t, i18n} = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.screen}>
            <Logo style={styles.logoContainer}/>
            <Text style={styles.text}>{t("welcomePhrase")}</Text>
            <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder={t("email")}
                placeholderTextColor={"darkgreen"}
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                placeholder={t("pass")}
                placeholderTextColor={"darkgreen"}
                style={styles.input}
            />

            <CustomButton onPress={(event) => {
                handleLogin(email, password).then(() => {
                    props.navigation.navigate("Profile")
                }).catch(e => {
                    console.log(e)
                })
            }}>
                {t("connect")}
            </CustomButton>


            <CustomButtonNoBorders
                onPress={(event) => props.navigation.navigate("CreateProfile")}
            >
                {t("subscribe")}
            </CustomButtonNoBorders>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 50,
        paddingTop: 0,
        backgroundColor: "#f5f5f5",
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        height: 30,
        borderBottomColor: "darkgreen",
        borderBottomWidth: 1,
        marginVertical: 10,
        marginBottom: 20,
        // placeholderTextColor : 'darkgreen',
    },
    text: {
        color: "darkgreen",
        fontSize: 20,
    },
    logoContainer: {
        marginBottom: 20,
        paddingBottom: 30,
    },
});

export default LoginPageView;
