import React, { useState } from "react";
import {
  View,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { styles } from "../component/styles";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { addUserText } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { getCurrentPosition } from "../services/location";
import { askLocalisationPermission } from "../services/permissions";
import { useTranslation } from "react-i18next";

const UserCommentView = () => {
  const { state } = useUserContext();
  const [userText, setUserText] = useState("");
  const [waiting, setWaiting] = useState(false);
  const { t } = useTranslation();
  askLocalisationPermission();
  // requestForegroundPermissions();

  const handleUserTextSubmit = async (userText) => {
    setWaiting(true);
    // instantLocation();
    addUserText(state.userId, userText, await getCurrentPosition())
      .then(() => {
        Alert.alert(t("titleDialogTextSend"), " ", [
          {
            text: t("ok"),
          },
        ]);
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        console.error(e);
        reset();
      })
      .finally(() => reset());
  };

  const reset = () => {
    setUserText("");
    setWaiting(false);
  };
  return (
    <ScrollView style={{ height: "100%" }} keyboardShouldPersistTaps="handled">
      {waiting ? (
        <View style={{ flex: 3, paddingTop: 20 }}>
          <ActivityIndicator size={"small"} />
          <Text style={{ textAlign: "auto", marginTop: 10 }}>
            {t("message_downloading_text")}
          </Text>
        </View>
      ) : (
        <View style={styles.screen}>
          <View style={styles.contentTextField}>
            <TextInput
              value={userText}
              onChangeText={(text) => setUserText(text)}
              placeholder={t("userText")}
              placeholderTextColor={"darkgreen"}
              style={styles.input}
            />
            <CustomButtonNoBorders
              onPress={async (event) => {
                if (userText === "") {
                  Alert.alert(t("titleDialog"), t("addComment"), [
                    {
                      text: t("ok"),
                    },
                  ]);
                } else {
                  await handleUserTextSubmit(userText);
                }
              }}
            >
              {t("ok")}
            </CustomButtonNoBorders>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default UserCommentView;
