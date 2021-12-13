import React, { useEffect, useState } from "react";
import { View, Alert, TextInput, ScrollView } from "react-native";
import { styles } from "../component/styles";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { addUserText } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { HOME_KEY } from "../constant/contants";
import { t } from "i18next";
import {
  requestForegroundPermissions,
  GetInstantLocation,
} from "../services/location";
import { askLocalisationPermission } from "../services/permissions";

const UserCommentView = (props) => {
  const { state } = useUserContext();
  const [userText, setUserText] = useState("");
  const [location, setLocation] = useState(null);

  askLocalisationPermission();
  // requestForegroundPermissions();

  const handleUserTextSubmit = async (userText) => {
    instantLocation();
    addUserText(state.userId, userText, location.toString()).then(() => {
      reset();
      props.navigation.navigate(HOME_KEY);
    });
  };

  const instantLocation = async () => {
    setLocation(await GetInstantLocation());
  };

  const reset = () => {
    setUserText("");
    setLocation(null);
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
                      onPress: () => props.navigation.navigate(HOME_KEY),
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
