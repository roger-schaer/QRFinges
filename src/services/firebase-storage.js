import { useState } from "react";
import { Platform } from "react-native";
import { ref, uploadBytes } from "firebase/storage";
import { photoFirebaseStorage } from "./firebase";
import { useUserContext } from "./user-context";

export const pictureToFirebaseStorage = async (picture) => {
  const { state } = useUserContext();
  const [image, setImage] = useState(null);

  setImage(picture);

  if (image === null || image === undefined) {
    console.log("NO PICTURE !!!!!");
    return;
  }

  const uri = image;
  const filename = state.id + "/" + uri.substring(uri.lastIndexOf("/") + 1);
  const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
  console.log("FILENAME :  " + filename);

  const storageRef = ref(photoFirebaseStorage, filename);

  uploadBytes(storageRef, uploadUri).then((snapshot) => {
    console.log("Image Uploaded !");
    // imageDestination = snapshot.metadata.fullPath;
    // handleUserPictureSubmit(imageDestination);
    // alert("Your photo has been uploaded to Firebase Cloud Storage!");
    // setImage(null);
  });

  alert("Your photo has been uploaded to Firebase Cloud Storage!");
  setImage(null);

  // const handleUserPictureSubmit = async (image) => {
  //   const { state } = useUserContext();
  //   // const [uploading, setUploading] = useState(false);
};
