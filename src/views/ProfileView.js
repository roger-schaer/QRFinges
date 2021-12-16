import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LocationBackgroundView } from "./LocationBackgroundView";
import { QR_CODE_KEY, PHOTO_KEY, USER_COMMENT } from "../constant/contants";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../services/user-context";
import { CustomButton } from "../component/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../component/styles";
import { StackActions } from "react-navigation";

const ProfileView = (props) => {
  const { state } = useUserContext();
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View
      style={[
        style.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View style={style.firstpart}>
        <View style={style.title}>
          <Text style={{ fontSize: 30, paddingBottom: 10 }}>
            {t("profileHead")}
          </Text>
          <LocationBackgroundView />
        </View>
      </View>

      <View style={style.secondpart}>
        <View style={style.qr}>
          <Text style={{ fontSize: 20, paddingBottom: 20, paddingTop: 20 }}>
            {t("interact")}
          </Text>
          <View style={{ width: 320 }}>
            <CustomButton onPress={() => navigation.navigate(QR_CODE_KEY)}>
              <AntDesign name={"qrcode"} size={15} />
              <View style={{ width: 5 }}></View>
              <Text style={styles.buttonText}>{t("scanQr")}</Text>
            </CustomButton>
            <CustomButton onPress={() => navigation.navigate(PHOTO_KEY)}>
              <AntDesign name={"camera"} size={15} />
              <View style={{ width: 5 }}></View>
              <Text style={styles.buttonText}>{t("takePic")}</Text>
            </CustomButton>
            <CustomButton onPress={() => navigation.navigate(USER_COMMENT)}>
              <AntDesign name={"filetext1"} size={15} />
              <View style={{ width: 5 }}></View>
              <Text style={styles.buttonText}>{t("takeCom")}</Text>
            </CustomButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  firstpart: {
    flex: 2,
    //backgroundColor: "red",
    textAlign: "center",
  },
  secondpart: {
    flex: 2,
    //backgroundColor: "blue",
  },
  title: {
    margin: 10,
    //backgroundColor: "yellow",
    alignItems: "center",
  },
  qr: {
    margin: 10,
    //backgroundColor: "purple",
    alignItems: "center",
  },
  btn: {
    color: "black",
  },
});

export default ProfileView;
