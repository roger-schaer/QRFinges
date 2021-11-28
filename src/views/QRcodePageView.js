import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "../component/styles";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useNetInfo } from "@react-native-community/netinfo";
import { WEBVIEW_KEY, PROFILE_KEY } from "../constant/contants";
import { askCameraPermission } from "../services/cameraPermission";
import { t } from "i18next";

const QRcodeView = (props) => {
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");
  const netInfo = useNetInfo();
  const [webAccess, setWebAccess] = useState(false);
  const onPressText = () => {
    setScanned(false);
    let uri = resultScanQR;
    setResultScanQR("");

    //   return props.navigation.navigate(WEBVIEW_KEY, { uri: uri });

    /* Zone de check si connexion et d'enregistrement du lien QR +/- ouverture page web */
    /* using function IsConected () from CheckInternetConnexion */

    (async () => {
      try {
        const testConnexion = await netInfo.isConnected;
        setWebAccess(testConnexion);
      } catch {
        setWebAccess(false);
        console.log("impossible de tester la connexion internet");
      }

      if (webAccess) {
        return props.navigation.navigate(WEBVIEW_KEY, { uri: uri });
      } else {
        alert(t("noInternetToWebView"));
        console.log("Pas d'internet uniquement stockage dans fireStore !!!");
        return props.navigation.navigate(PROFILE_KEY);
      }
    })();
  };

  askCameraPermission();
  // const askForPermission = () => {
  //   (async () => {
  //     try {
  //       const { status } = await Camera.requestPermissionsAsync();
  //       setHasPermissionQR(status === "granted");

  //       if (status === "granted") {
  //         console.log("permission granted");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // };

  // useEffect(() => {
  //   askForPermission();
  // }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(t("scan_OK"));
    setResultScanQR(data);
  };

  // if (hasPermissionQR === null) {
  //   return (
  //     <View style={styles.screen}>
  //       <Text>Requesting for camera permission</Text>
  //       <Button title={"Allow camera"} onPress={() => askForPermission()} />
  //     </View>
  //   );
  // }
  // if (hasPermissionQR === false) {
  //   return (
  //     <View style={styles.screen}>
  //       <Text style={{ margin: 10 }}>No access to camera</Text>
  //       <Button
  //         title={"You need camera to continue"}
  //         onPress={() => askForPermission()}
  //       />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.barcodeBox}>
          <Camera
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
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
