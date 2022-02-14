import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { WEBVIEW_KEY } from "../constant/constants";
import { t } from "i18next";
import { qrcodeInFirebase, addRecordQRCode } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import { askCameraPermission } from "../services/permissions";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export const checkIsUrl = (value) => {
  const pattern = new RegExp(
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

const QRCodeScanView = (props) => {
  const { state } = useUserContext();
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");
  const [isUrl, setIsUrl] = useState(false);
  const [isUrlInFirebase, setIsUrlInFirebase] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [qrcodeSize, setQrcodeSize] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  askCameraPermission();

  useEffect(() => {
    console.log("Scanned", scanned.toString());
  }, [scanned]);

  const onPressText = () => {
    setScanned(false);

    try {
      isUrlInFirebase
        ? addRecordQRCode(state.userId, resultScanQR).then(() => {
            // isUrlInFirebase ? navigation.navigate(WEBVIEW_KEY, { uri: resultScanQR }) : Linking.openURL(resultScanQR);
            navigation.navigate(WEBVIEW_KEY, { uri: resultScanQR });
            setResultScanQR("");
          })
        : Linking.openURL(resultScanQR) && setResultScanQR("");
    } catch (e) {
      console.error("Echec !");
    }
  };

  /* useEffect(() => {}, [origin, qrcodeSize]); */

  const handleBarCodeScanned = async (barcode) => {
    const { data } = barcode;
    setScanned(true);
    setOrigin(barcode.bounds.origin);
    setQrcodeSize(barcode.bounds.size);
    setTimeout(async () => {
      setOrigin(null);
      setQrcodeSize(null);
      setResultScanQR(data);
      setIsUrl(checkIsUrl(data));
      const inFirebase = await qrcodeInFirebase(data);
      setIsUrlInFirebase(inFirebase);
    }, 300);
  };

  const reset = () => {
    setIsUrl(false);
    setResultScanQR("");
    setScanned(false);
    setIsUrlInFirebase(false);
  };

  return (
    <View style={{ flexGrow: 1 }}>
      {isFocused && resultScanQR === "" && (
        <View style={{ flexGrow: 1, justifyContent: "center" }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ padding: 50 }}
          >
            <View
              style={{
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
      )}

      {resultScanQR !== "" && (
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            {isUrl && (
              <MaterialIcons name="link" size={32} style={{ flex: 0.1 }} />
            )}
            <Text style={{ flex: 0.8, color: "black", fontSize: 16 }}>
              {resultScanQR}
            </Text>
            <TouchableOpacity onPress={reset} style={{ flex: 0.1 }}>
              <MaterialIcons name="close" size={32} />
            </TouchableOpacity>
          </View>
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
  );
};

export default QRCodeScanView;
