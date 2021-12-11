import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "../component/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { HOME_KEY, WEBVIEW_KEY } from "../constant/contants";
import { useTranslation } from "react-i18next";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import {
  addRecordQRCode,
  addUserText,
  qrcodeInFirebase,
} from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { askCameraPermission } from "../services/cameraPermission";

export const checkIsUrl = (value) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(value);
};

const QRcodeView = (props) => {
  const { t } = useTranslation();
  const { state } = useUserContext();
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");
  const [userText, setUserText] = useState("");
  const [isUrl, setIsUrl] = useState(false);
  const [isUrlInFirebase, setIsUrlInFirebase] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [qrcodeSize, setQrcodeSize] = useState(null);
  const [timer, setTimer] = useState(null);
  askCameraPermission();

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

  /* useEffect(() => {}, [origin, qrcodeSize]); */

  const handleBarCodeScanned = async (barcode) => {
    const { data } = barcode;
    timer && clearInterval(timer);
    setScanned(true);
    setOrigin(barcode.bounds.origin);
    setQrcodeSize(barcode.bounds.size);
    setResultScanQR(data);
    setIsUrl(checkIsUrl(data));
    setTimer(
      setInterval(() => {
        setOrigin(null);
        setQrcodeSize(null);
      }, 300)
    );
    if (!isUrl) {
      setScanned(false);
      return false;
    }
    const inFirebase = await qrcodeInFirebase(resultScanQR);
    await setIsUrlInFirebase(inFirebase);
    setScanned(false);
  };

  const handleUserTextSubmit = async (userText) => {
    await addUserText(state.userId, userText);
    setUserText("");
  };

  const reset = () => {
    setIsUrl(false);
    setResultScanQR("");
    setScanned(false);
    setIsUrlInFirebase(false);
  };

  return (
    <ScrollView>
      <View style={{}}>
        <View style={{}}>
          <BarCodeScanner
            onBarCodeScanned={!scanned && handleBarCodeScanned}
            style={{ height: 400, width: "100%", padding: 50 }}
          >
            <View
              style={{
                borderColor: "red",
                borderWidth: 2,
                height: "100%",
                width: "100%",
              }}
            ></View>
            {origin && qrcodeSize && (
              <View
                style={{
                  position: "absolute",
                  height: qrcodeSize.height,
                  width: qrcodeSize.width,
                  left: origin.x,
                  top: origin.y,
                  borderColor: "green",
                  borderWidth: 5,
                }}
              ></View>
            )}
          </BarCodeScanner>
        </View>

        {resultScanQR !== "" && (
          <View style={{}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {isUrl && (
                  <MaterialIcons
                    name="link"
                    size={16}
                    style={{ marginRight: 5 }}
                  />
                )}
                <Text style={{ color: "black", fontSize: 16 }}>
                  {resultScanQR}
                </Text>

                <MaterialIcons
                  name="close"
                  size={16}
                  onPress={() => {
                    reset();
                  }}
                />
              </View>
            </TouchableOpacity>
            {isUrl && (
              <TouchableOpacity
                style={{
                  backgroundColor: "darkgreen",
                  alignItems: "center",
                }}
                onPress={onPressText}
              >
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    alignItems: "center",
                  }}
                >
                  Navigate {isUrlInFirebase ? "webview" : "external"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
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
    </ScrollView>
  );
};

export default QRcodeView;
