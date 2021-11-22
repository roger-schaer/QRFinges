import React, { useEffect, useState } from "react";
import {View, Text, TextInput, Button, TouchableOpacity, Linking, ScrollView} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from "expo-barcode-scanner";
import {CustomButton} from "../component/CustomButton";
import {CustomButtonNoBorders} from "../component/CustomButtonNoBorders";
import {handleSubmit} from "../services/firebase";


const QRcodeView = (props) => {
    const { t } = useTranslation();
    const [hasPermissionQR, setHasPermissionQR] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [resultScanQR, setResultScanQR] = useState("");
    const [userText, setUserText] = useState("");
    const [error, setError] = useState("");

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
          <ScrollView>
          <View style={styles.screen}>
              <View style={styles.content}>

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
                      <CustomButton title={'Scan again ?'} onPress={()=> setScanned(false)}>{t("scan_again")}</CustomButton>
                   </View>
                   }
              </View>
              <MaterialIcons name="add-a-photo" size={24} style={styles.iconContainer} />
              <TextInput
                  value={userText}
                  onChangeText={(text) => setUserText(text)}
                  placeholder={t("userText")}
                  placeholderTextColor={"darkgreen"}
                  style={styles.input}
              />
              {error ? <Text style={styles.errors}> {error}</Text> : null}
              <CustomButtonNoBorders  onPress={(event) => {
                  handleSubmit(userText).then(r => {console.log("user text added successfully")});
              }}>{t("ok")}</CustomButtonNoBorders>
          </View>
          </ScrollView>
      );
  };
  
export default QRcodeView;