import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, Linking } from "react-native";
import { styles } from "../component/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { WEBVIEW_KEY } from "../constant/contants";

const QRcodeView = (props) => {
  const isFocused = useIsFocused();
  const [hasPermissionQR, setHasPermissionQR] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [resultScanQR, setResultScanQR] = useState("");

  const onPressText = () => {
    // Linking.openURL(resultScanQR);
    setScanned(false);
    let uri = resultScanQR;
    setResultScanQR("");

    return props.navigation.navigate(WEBVIEW_KEY, { uri: uri });

    /* Zone de check si connexion et d'enregistrement du lien QR +/- ouverture page web */
    /* using function IsConected () from CheckInternetConnexion */

    // (async() =>{
    //   try {

    //   }

    // })();
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
    alert(`Code QR has been scanned ! (click on the link to finish)`);
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

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text> Scanner le QR code </Text>
        <View style={styles.barcodeBox}>
          <Text> Ici doit être Scanner le QR code </Text>
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
    </View>
  );
};

async function requestCameraPermission() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  return hasPermission;
}

export default QRcodeView;
