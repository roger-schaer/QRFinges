import React, { useCallback, useEffect, useState } from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { Camera } from 'expo-camera';


const CameraView = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const onPressText = () => {
      // Linking.openURL(resultScanQR);
    //   setScanned(false);
    //   setResultScanQR("");

    //   return props.navigation.navigate('webviewer', {uri: resultScanQR});
  
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
            setHasPermission(status === 'granted');
    
            if (status === 'granted') {
              console.log('permission granted')
            }
          } catch (e) {
              console.log(e);
          }
        })();
      }

useEffect(() => {
  askForPermission();
}, []);

    
      if (hasPermission === null) {
        return (
          <View style={styles.screen}>
            <Text>Requesting for camera permission</Text>
                <Button 
                title={'Allow camera'} 
                onPress={() => askForPermission()} />
          </View>

              )
      }
      if (hasPermission === false) {
        return (
          <View style={styles.screen}>
            <Text style={{margin: 10}}>No access to camera</Text>;
            <Button 
              title={'You need camera to take photo'} 
              onPress={() => askForPermission()} />
          </View>
        )
      }

    
      return (  
            // <View style={styles.screen}>
            //   <View  style={styles.content} >
              <Camera style={styles.camera} type={type}>
        <View style={styles.cameraButtonContainer }>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>

        //   </View>
        //   </View>
      );
  };

export default CameraView;