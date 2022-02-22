import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { styles } from "../component/styles";
import { Camera } from "expo-camera";
import {
  askCameraPermission,
  askLocalisationPermission,
} from "../services/permissions";
import { useUserContext } from "../services/user-context";
import { t } from "i18next";
import { storage, addImageToUser } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import { getCurrentPosition } from "../services/location";

const CameraView = (props) => {
  const { state } = useUserContext();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState("uri");
  const [isPicked, setIsPicked] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const isFocused = useIsFocused();
  const [waiting, setWaiting] = useState(false);
  const windowWidth = useWindowDimensions().width;
  let camera;
  let p;
  let date;
  let uri;

  askCameraPermission();
  askLocalisationPermission();

  const takePicture = async () => {
    p = null;
    if (camera) {
      const options = {
        quality: 0.5,
        zoom: 0,
        autofocus: Camera.Constants.AutoFocus.on,
        whiteBalance: Camera.Constants.WhiteBalance.auto,
      };
      p = await camera.takePictureAsync(options);
    }

    if (p) {
      setPicture(p.uri);
      setPhoto(p);
      setIsPicked(true);
    }
  };

  const savePicture = async () => {
    setWaiting(true);
    setIsUploading(true);
    const response = await fetch(picture);
    let blob = await response.blob();

    date = new Date();
    uri = `${date.toISOString().toLocaleLowerCase("fr-CH")}_${picture.substring(
      picture.lastIndexOf("/") + 1
    )}`;

    const storageRef = ref(storage, "Photos/" + uri);

    try {
      await uploadBytes(storageRef, blob);

      const imageURL = await getDownloadURL(storageRef);

      await addImageToUser(
        state.userId,
        imageURL,
        date,
        await getCurrentPosition()
      );

      blob = null;
      console.log("Image uploaded!");
      newPicture();
    } catch (e) {
      console.error(e);
      newPicture();
    }
  };

  const newPicture = () => {
    p = null;
    setIsPicked(false);
    setPhoto(null);
    setPicture(null);
    setIsUploading(false);
    setWaiting(false);
  };

  return (
    <>
      {waiting ? (
        <View style={{ flex: 3, paddingTop: 50 }}>
          <ActivityIndicator size={"small"} />
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            {t("message_downloading_image")}
          </Text>
        </View>
      ) : (
        <>
          {isFocused ? (
            <>
              {!isPicked ? (
                <View style={styles.flexContainer}>
                  <View style={styles.cameraContainer}>
                    <Camera
                      style={{
                        width: windowWidth,
                        height: windowWidth * (4 / 3),
                      }}
                      ratio="4:3"
                      type={type}
                      ref={(refs) => {
                        camera = refs;
                      }}
                    />
                  </View>
                  <View style={styles.cameraButtonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}
                      style={styles.cameraButtonLeft}
                    >
                      <Ionicons name="camera-reverse" size={40} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={takePicture}
                      style={styles.cameraButtonCenter}
                    >
                      <MaterialIcons
                        name="enhance-photo-translate"
                        size={60}
                        color="green"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  {isUploading ? <LinearProgress color="darkgreen" /> : null}
                  <Image style={styles.camera} source={{ uri: picture }} />
                  {!isUploading && (
                    <>
                      <TouchableOpacity
                        style={styles.customBtnGreen}
                        onPress={newPicture}
                      >
                        <Text
                          style={{
                            color: "cornsilk",
                            textAlign: "center",
                          }}
                        >
                          {t("newPicture")}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.cameraButtonSave}>
                        <MaterialCommunityIcons
                          name="content-save-move"
                          size={60}
                          color="green"
                          onPress={savePicture}
                        />
                      </View>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <Text></Text>
          )}
        </>
      )}
    </>
  );
};

export default CameraView;
