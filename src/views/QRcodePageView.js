import React, { useEffect, useState } from "react";
import {View, Text, Button, TouchableOpacity, Linking} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from "expo-barcode-scanner";

const QRcodeView = (props) => {
    const [hasPermissionQR, setHasPermissionQR] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [resultScanQR, setResultScanQR] = useState("");
    const onPressText = () => {
      Linking.openURL(resultScanQR);
      setScanned(false);
      setResultScanQR("");

      return <QRcodeView/>
  
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
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermissionQR(status === 'granted');
    
          if (status === 'granted') {
            console.log('permission granted')
            //setHasPermissionQR(BarCodeScanner.getPermissionsAsync);
          }
          } catch (e) {
              console.log(e);
          }
        })();
      }
  
      useEffect(() => {
        askForPermission();
      }, []);
    
      const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(`Code QR has been scanned ! (click on the link to finish)`);
        setResultScanQR(data);
      };
    
      if (hasPermissionQR === null) {
        return <View style={styles.screen}><Text>Requesting for camera permission</Text></View>;
      }
      if (hasPermissionQR === false) {
        return (
          <View style={styles.screen}>
            <Text style={{margin: 10}}>No access to camera</Text>;
            <Button 
              title={'Allow Camera'} 
              onPress={() => askForPermission()} />
          </View>
        )
      }
    
      return (
          <View style={styles.screen}>
              <View style={styles.content}>
              <Text> Zone de scanning du QR code </Text>
                  <View style={styles.barcodeBox}>
                  <BarCodeScanner
                      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}   
                      
                      style={{height: 400, width: 400}}
                  />               
          </View>
          { scanned 
                  &&
                  <View style={styles.content}>
                      <TouchableOpacity 
                      style= {styles.customBtnGreen}
                      onPress={ onPressText }>
                          <Text style={{color: "cornsilk",}}>
                          { resultScanQR }
                          </Text>
                      </TouchableOpacity>
                       {/* <Button title={ resultScanQR }  onPress={ onPressText }/> */}
  
                      <Button title={'Scan again ?'} onPress={()=> setScanned(false)} color='tomato'/>
                   </View>
                   }
              </View>
              <MaterialIcons name="add-a-photo" size={24} style={styles.iconContainer} />
          </View>
      );
  };
  
export default QRcodeView;