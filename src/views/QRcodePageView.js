import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { WEBVIEW_KEY } from "../constant/contants";
import { t } from "i18next";
import { qrcodeInFirebase, addRecordQRCode } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { askCameraPermission } from "../services/permissions";
import { useNavigation } from "@react-navigation/native";

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
  const { state } = useUserContext();
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");
  const [isUrl, setIsUrl] = useState(false);
  const [isUrlInFirebase, setIsUrlInFirebase] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [qrcodeSize, setQrcodeSize] = useState(null);
  const [timer, setTimer] = useState(null);
  const navigation = useNavigation();

  askCameraPermission();

  const onPressText = () => {
    setScanned(false);

    try {
      addRecordQRCode(state.userId, resultScanQR).then(() => {
        isUrlInFirebase ? navigation.navigate(WEBVIEW_KEY, { uri: resultScanQR }) : Linking.openURL(resultScanQR);
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

  const reset = () => {
    setIsUrl(false);
    setResultScanQR("");
    setScanned(false);
    setIsUrlInFirebase(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
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
                {isUrl && <MaterialIcons name="link" size={16} style={{ marginRight: 5 }} />}
                <Text style={{ color: "black", fontSize: 16 }}>{resultScanQR}</Text>

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
                  {t(`navigate_${isUrlInFirebase ? "internal" : "external"}`)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default QRcodeView;
