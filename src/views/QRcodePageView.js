import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "../component/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useNetInfo } from "@react-native-community/netinfo";
import { WEBVIEW_KEY, PROFILE_KEY } from "../constant/contants";
import { askCameraPermission } from "../services/cameraPermission";
import { useUserContext } from "../services/user-context";
import { t } from "i18next";
import { addRecordQRCode } from "../services/firebase";

const QRcodeView = (props) => {
  const { state } = useUserContext();
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");
  const netInfo = useNetInfo();
  const [webAccess, setWebAccess] = useState(false);
  let testConnexion;
  const onPressText = () => {
    setScanned(false);
    const QRuri = resultScanQR;
    setResultScanQR("");

    // QRcodeView(props);
    //   return props.navigation.navigate(WEBVIEW_KEY, { uri: uri });

    /* Zone de check si connexion et d'enregistrement du lien QR +/- ouverture page web */
    /* using function IsConected () from CheckInternetConnexion */

    (() => {
      try {
        //     testConnexion = netInfo.isConnected;
        //     console.log("Tester la connexion internet : " + testConnexion);
        //     setWebAccess(testConnexion);
        saveQRCode(state.userId, QRuri).then(() => {
          return props.navigation.navigate(WEBVIEW_KEY, { uri: QRuri });
        });
      } catch {
        console.log("Echec !");
      }

      // if (!webAccess) {
      // return props.navigation.navigate(WEBVIEW_KEY, { uri: QRuri });
      //   } else {
      //     // alert(t("noInternetToWebView"));
      //     console.log("Pas d'internet uniquement stockage dans fireStore !!!");
      //     return props.navigation.navigate(PROFILE_KEY);
      //   }
    })();
  };

  askCameraPermission();

  const saveQRCode = async (stateId, QRuri) => {
    await addRecordQRCode(stateId, QRuri);
    setResultScanQR("");

    console.log("QRCode " + QRuri + " saved");
  };

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
            // barCodeScannerSettings={{
            //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            // }}
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
