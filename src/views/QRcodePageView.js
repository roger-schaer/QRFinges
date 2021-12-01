import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "../component/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { WEBVIEW_KEY } from "../constant/contants";
import { askCameraPermission } from "../services/cameraPermission";
import { useUserContext } from "../services/user-context";
import { t } from "i18next";
import { addRecordQRCode } from "../services/firebase";

const QRcodeView = (props) => {
  const { state } = useUserContext();
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");

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

  askCameraPermission();

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(t("scan_OK"));
    setResultScanQR(data);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.barcodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
              title={t("Scan_again")}
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
    </View>
  );
};

export default QRcodeView;
