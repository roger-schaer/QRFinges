import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Logo } from "../component/Logo";
import { CustomButton } from "../component/CustomButton";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { handleLogin } from "../services/firebase";
import { USER_ID } from "../utils/request";
import { useUserContext } from "../services/user-context";

const LoginPageView = (props) => {
  // Translation
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      let loginData = await handleLogin(email, password);
      console.log("handleLogin successfull", loginData.user.uid);

      localStorage.setItem(USER_ID, loginData.user.uid);
      console.log(
        "save to local storage successfull",
        localStorage.getItem(USER_ID)
      );

      dispatch({
        type: "SET_LOGIN",
        userId: loginData.user.uid,
        isLoggedIn: true,
      });
      console.log("dispatch successfull");
      console.log(props);
      console.log(state.userId);

      props.navigation.navigate("Profile");
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
      //setError(e.message)
      console.error(e);
    }
  };

  const handleSubmit = (e) => {
    // Stop the browser from submitting in the "traditional" way
    e.preventDefault();
    login();
  };

  return (
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

      {error && <Text style={styles.errors}> {error}</Text>}

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
