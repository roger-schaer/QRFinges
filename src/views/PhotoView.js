import React, { useRef, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { styles } from "../component/styles";
import { Camera } from "expo-camera";
import { askCameraPermission } from "../services/cameraPermission";
import { useUserContext } from "../services/user-context";
import { t } from "i18next";
import { pictureToFirebaseStorage } from "../services/firebaseStorage";

const CameraView = (props) => {
  const { state } = useUserContext();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState("uri");
  const [isPicked, setIsPicked] = useState(false);
  const isFocused = useIsFocused();
  let camera;
  let photo;

  askCameraPermission();

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5 };
      photo = await camera.takePictureAsync(options);
    }
    console.log(" photo " + photo);

    if (photo) {
      setPicture(photo.uri);
      setIsPicked(true);
    }
  };

  console.log("picture 2 " + picture);

  const savePicture = () => {
    pictureToFirebaseStorage(picture);
    newPicture();
  };

  const newPicture = () => {
    setIsPicked(false);
    setPicture("uri");
    photo = null;
  };

  const pictureToFirebaseStorage = (image) => {
    pictureToFirebaseStorage(image);
  };

  // const handleUserPictureSubmit = (image) => {
  //   //const { state } = useUserContext();
  //   //const [uploading, setUploading] = useState(false);

  //   addImage(state.id, image);
  //   // setImage(null);
  //   //setScanned(false);
  // };

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
            <Ionicons
              name="camera-reverse"
              style={styles.cameraButton}
              size={40}
              color="green"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <MaterialIcons
              name="enhance-photo-translate"
              style={styles.cameraButton}
              size={60}
              color="green"
              onPress={takePicture}
            />
          </View>
        </Camera>
      ) : (
        <>
          <Image style={styles.camera} source={{ uri: picture }} />
          <TouchableOpacity style={styles.customBtnGreen} onPress={newPicture}>
            <Text style={{ color: "cornsilk" }}>{t("newPicture")}</Text>
          </TouchableOpacity>
          <MaterialCommunityIcons
            name="content-save-move"
            style={styles.cameraButton}
            size={40}
            color="green"
            onPress={savePicture}
          ></MaterialCommunityIcons>
          {/* <TouchableOpacity style={styles.customBtnGreen} onPress={savePicture}>
            <Text style={{ color: "cornsilk" }}>{t("newPicture")}</Text>
          </TouchableOpacity> */}
        </>
      )}
    </>
  );
};

export default CameraView;
