import React, { useRef, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { Camera } from "expo-camera";
import { Image } from "react-native-elements";
import { CameraType } from "expo-camera/build/Camera.types";

const CameraView = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState("");
  const [isPicked, setIsPicked] = useState(false);
  const isFocused = useIsFocused();

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
        setHasPermission(status === "granted");

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

  if (hasPermission === null) {
    return (
      <View style={styles.screen}>
        <Text>Requesting for camera permission</Text>
        <Button title={"Allow camera"} onPress={() => askForPermission()} />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.screen}>
        <Text style={{ margin: 10 }}>No access to camera</Text>;
        <Button
          title={"You need camera to take photo"}
          onPress={() => askForPermission()}
        />
      </View>
    );
  }

  let camera;

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5 };
      let photo = await camera.takePictureAsync(options);
      console.log(photo.uri);
      setIsPicked(true);
      setPicture(photo);
    }
    //   //console.log(photo.uri);
    //   console.log("Photo PRISE !!!!!!!!!!!!!!!!!");
  };

  // function CameraComponent(){
  //  let camera;

  // const takePicture= async () =>
  //   {
  //     // const camera = useRef(type) ;
  //     //const camera = Camera;
  //     if (camera) {
  //       const options = {quality: 0.5};
  //       let photo = await camera.takePictureAsync(options);
  //       console.log(photo.uri);
  //       // setIsPicked(true);
  //       // setPicture(photo);
  //     }
  //     //console.log(photo.uri);
  //     console.log("Photo PRISE !!!!!!!!!!!!!!!!!");
  //   };

  //     return (
  //     <>
  //       {!isPicked ? (
  //         <Camera style={styles.camera}
  //           type={type}
  //           ref={ref => {
  //             this.camera = ref;
  //           }}
  //         >
  //   <View style={styles.cameraButtonContainer }>
  //     <TouchableOpacity
  //       style={styles.cameraButton}
  //       onPress={() => {
  //         setType(
  //           type === Camera.Constants.Type.back
  //             ? Camera.Constants.Type.front
  //             : Camera.Constants.Type.back
  //         );

  //       }}>
  //       <Text style={styles.text}> Flip </Text>
  //     </TouchableOpacity>

  //     <TouchableOpacity
  //       // style={styles.cameraButton}
  //       onPress={takePicture}>
  //       <Text style={styles.text}> Take picture !!!! </Text>
  //     </TouchableOpacity>
  //   </View>
  // </Camera>
  //   ):(
  //     <Image style={styles.camera} source={{uri: picture}}/>

  //     )
  //   }
  //   </>
  //   );
  // }

  return (
    <>
      {!isPicked ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            camera = ref;
          }}
        >
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // style={styles.cameraButton}
              onPress={takePicture}
            >
              <Text style={styles.text}> Take picture !!!! </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image style={styles.camera} source={{ uri: picture }} />
      )}
    </>
  );
};

export default CameraView;
