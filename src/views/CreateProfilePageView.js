import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { handleSignup } from "../services/firebase";
import { CustomButton } from "../component/CustomButton";
import { useTranslation } from "react-i18next";
import { HOME_KEY, LOCALSTORAGE_USER_ID } from "../constant/constants";
import { setStorageData } from "../services/storage";
import { useUserContext } from "../services/user-context";
import { useNavigation } from "@react-navigation/native";

const CreateProfilePageView = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { dispatch } = useUserContext();
  const navigation = useNavigation();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View>
        <View style={styles.screen}>
          <Text style={styles.title}>{t("createAccount")}</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={t("email")}
            placeholderTextColor={"darkgreen"}
            style={styles.input}
            keyboardType={"email-address"}
          />

          <TextInput
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder={t("firstName")}
            placeholderTextColor={"darkgreen"}
            style={styles.input}
          />
          <TextInput
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder={t("lastName")}
            placeholderTextColor={"darkgreen"}
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={t("pass")}
            placeholderTextColor={"darkgreen"}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder={t("confirmPass")}
            placeholderTextColor={"darkgreen"}
            style={styles.input}
            secureTextEntry
          />
          {error ? <Text style={styles.errors}> {error}</Text> : null}
          <CustomButton
            onPress={(event) => {
              if (
                firstName === "" ||
                lastName === "" ||
                email === "" ||
                password === ""
              ) {
                return setError(t("allFieldRequired"));
              }
              if (password !== confirmPassword) {
                return setError(t("passwordDoNotMatch"));
              }
              setError("");
              handleSignup(email, password, firstName, lastName)
                .then((res) => {
                  setStorageData(LOCALSTORAGE_USER_ID, res.user.uid);
                  dispatch({
                    type: "SET_LOGIN",
                    userId: res.user.uid,
                    isLoggedIn: true,
                  });
                  navigation.navigate(HOME_KEY);
                })
                .catch((e) => {
                  const errorCode = e.code;
                  switch (errorCode) {
                    case "auth/email-already-in-use":
                      setError(t("emailAlreadyInUse"));
                      break;
                    case "auth/weak-password":
                      setError(t("weakPassword"));
                      break;
                    case "auth/invalid-email":
                      setError(t("invalidEmail"));
                      break;
                    default:
                      setError(t("errorOccurred"));
                  }
                  console.error(e);
                });
            }}
          >
            {t("create")}
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    paddingTop: 15,
  },
  errors: {
    paddingBottom: 15,
    color: "red",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "darkgreen",
    padding: 10,
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
  },
  text: {
    color: "darkgreen",
    fontSize: 20,
  },
});

export default CreateProfilePageView;
