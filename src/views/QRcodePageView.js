import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "../component/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { PROFILE_KEY, WEBVIEW_KEY } from "../constant/contants";
import { useTranslation } from "react-i18next";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { addRecordQRCode, addUserText } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { askCameraPermission } from "../services/cameraPermission";

const QRcodeView = (props) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const { state } = useUserContext();
  const [hasPermissionQR, setHasPermissionQR] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");
  const [userText, setUserText] = useState("");

  const onPressText = () => {
    setScanned(false);

    try {
      addRecordQRCode(state.userId, resultScanQR).then(() => {
        props.navigation.navigate(WEBVIEW_KEY, { uri: resultScanQR });
        setResultScanQR("");
      });
    } catch (e) {
      console.log("Echec !");
    }
  };

  const askForPermission = () => {
    (async () => {
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermissionQR(status === "granted");

        if (status === "granted") {
          console.log("permission granted");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };

  useEffect(() => {
    askForPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    setResultScanQR(data);
  };

  if (hasPermissionQR === null) {
    return (
      <View style={styles.screen}>
        <Text>Requesting for camera permission</Text>
        <Button title={"Allow camera"} onPress={() => askForPermission()} />
      </View>
    );
  }
  if (hasPermissionQR === false) {
    return (
      <View style={styles.screen}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"You need camera to continue"}
          onPress={() => askForPermission()}
        />
      </View>
    );
  }

  const handleUserTextSubmit = async (userText) => {
    await addUserText(state.userId, userText);
    setUserText("");
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.content}>
          <Text> {t("scanQR")} </Text>
          <View style={styles.barcodeBox}>
            <Text> Ici doit être Scanner le QR code </Text>
            <Camera
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              onBarCodeScanned={handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
          </View>

          {scanned && (
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.customBtnGreen}
                onPress={onPressText}
              >
                <Text style={{ color: "cornsilk" }}>{resultScanQR}</Text>
              </TouchableOpacity>

              <Button
                title={"Scan again ?"}
                onPress={() => setScanned(false)}
                color="tomato"
              />
            </View>
          )}
        </View>
        <MaterialIcons
          name="add-a-photo"
          size={24}
          style={styles.iconContainer}
        />
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
                    onPress: () => props.navigation.navigate(PROFILE_KEY),
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

export default QRcodeView;
