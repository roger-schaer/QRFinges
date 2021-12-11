import React, { useEffect, useState } from "react";
import { View, Alert, TextInput, ScrollView } from "react-native";
import { styles } from "../component/styles";
import { useTranslation } from "react-i18next";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { addUserText } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { useNavigation } from "@react-navigation/native";
import { HOME_KEY } from "../constant/contants";

const UserCommentView = (props) => {
  const { t } = useTranslation();
  const { state } = useUserContext();
  const [userText, setUserText] = useState("");
  const navigation = useNavigation();

  const handleUserTextSubmit = async (userText) => {
    await addUserText(state.userId, userText);
    setUserText("");
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.content}>
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
      </View>
    </ScrollView>
  );
};

export default UserCommentView;
