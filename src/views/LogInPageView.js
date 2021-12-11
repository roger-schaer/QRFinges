import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { t } from "i18next";
import { Logo } from "../component/Logo";
import { CustomButton } from "../component/CustomButton";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { handleLogin } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { getStorageData, setStorageData } from "../services/storage";
import {
  FAQ_KEY,
  HOME_KEY,
  LOCALSTORAGE_USER_EMAIL,
  LOCALSTORAGE_USER_ID,
  PROFILE_KEY,
  SUBSCRIBE_KEY,
} from "../constant/contants";
import { useTranslation } from "react-i18next";

const LoginPageView = (props) => {
  const { state, dispatch } = useUserContext();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      let loginData = await handleLogin(email, password);
      setStorageData(LOCALSTORAGE_USER_ID, loginData.user.uid);
      setStorageData(LOCALSTORAGE_USER_EMAIL, loginData.user.email);
      console.log(
        "Save to local storage successfull",
        getStorageData(LOCALSTORAGE_USER_ID)
      );

      dispatch({
        type: "SET_LOGIN",
        userId: loginData.user.uid,
        email: loginData.user.email,
        isLoggedIn: true,
      });
    } catch (e) {
      dispatch({
        type: "IS_LOGGED_ERROR",
        error: "Error with API on login",
      });
      var errorCode = e.code;
      switch (errorCode) {
        case "auth/invalid-email":
          setError(t("invalidEmail"));
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError(t("wrongPass"));
          break;
        default:
          setError("An error occurred");
      }
      console.error(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Logo style={styles.logoContainer} />
        <Text style={styles.text}>{t("welcomePhrase")}</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder={t("email")}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder={t("pass")}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />

        {error ? <Text style={styles.errors}> {error}</Text> : null}

        <CustomButton
          onPress={(event) => {
            if (email == "" || password == "") {
              return setError(t("allFieldRequired"));
            }
            handleSubmit(event);
          }}
        >
          {t("connect")}
        </CustomButton>

        <CustomButtonNoBorders
          onPress={(event) => props.navigation.navigate(SUBSCRIBE_KEY)}
        >
          {t("subscribe")}
        </CustomButtonNoBorders>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    paddingTop: 0,
    backgroundColor: "#f5f5f5",
  },
  errors: {
    paddingBottom: 15,
    color: "red",
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
