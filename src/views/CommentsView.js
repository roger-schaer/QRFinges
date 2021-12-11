import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { addUserText } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { HOME_KEY } from "../constant/contants";
import { useNavigation } from "@react-navigation/native";

const ContactPageView = () => {
  const [userText, setUserText] = useState("");
  const { state } = useUserContext();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleUserTextSubmit = async (userText) => {
    await addUserText(state.userId, userText);
    setUserText("");
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TextInput
          value={userText}
          onChangeText={(text) => setUserText(text)}
          placeholder={t("userText")}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        <CustomButtonNoBorders
          onPress={(event) => {
            if (userText == "") {
              Alert.alert(t("titleDialog"), t("addComment"), [
                {
                  text: t("ok"),
                  onPress: () => console.log("OK pressed"),
                },
              ]);
            } else {
              handleUserTextSubmit(userText).then(() => {
                Alert.alert(t("titleDialogTextSend"), " ", [
                  {
                    text: t("ok"),
                    onPress: () => navigation.navigate(HOME_KEY),
                  },
                ]);
              });
            }
          }}
        >
          {t("ok")}
        </CustomButtonNoBorders>
      </View>
    </ScrollView>
  );
};

const contactPageStyle = StyleSheet.create({
  screen: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
  },

  row: {
    flexDirection: "row",
  },

  text: {
    fontSize: 16,
    color: "darkgreen",
    paddingBottom: 15,
    paddingTop: 15,
  },
});

export default ContactPageView;
