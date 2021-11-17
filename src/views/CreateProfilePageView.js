import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { CustomButton } from "../component/CustomButton";
import {useTranslation} from "react-i18next";
import { styles } from "../component/styles";

const CreateProfilePageView = (props) => {

  const { t, i18n } = useTranslation();

  return (
    <View>
      <View style={styles.screen}>
        <Text style={styles.title}>{t("createAccount")}</Text>
        <TextInput
          placeholder={t("pseudo")}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        <TextInput
          placeholder={t("pass")}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        <TextInput
          placeholder={t("email")}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        <TextInput
          placeholder={t("confirmPass")}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        <CustomButton onPress={(event) => props.navigation.navigate("Profile")}>
          {t("create")}
        </CustomButton>
      </View>
    </View>
  );
};

export default CreateProfilePageView;
