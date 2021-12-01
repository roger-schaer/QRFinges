import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { ref, uploadBytes } from "firebase/storage";
// import { photoFirebaseStorage, storage } from "../config/firebase";
import { addImage, photoFirebaseStorage } from "../services/firebase";
// import { useUserContext } from "../services/user-context";

// const firebaseStorage = firebaseStore.getStorage(app);

export default function pictureToFirebaseStorage(userId, picture) {
  let imageDestination;
  const [image, setImage] = useState(null);

  // const { state } = useUserContext();
  // const image = firebaseStorage();

  const [uploading, setUploading] = useState(false);
  //const [transferred, setTransferred] = useState(0);
  //const imagesRef = ref(storage, "images");
  //   try {
  console.log("UPLOAD FAILED !!");

  if (image == null || image == undefined) {
    console.log("NO PICTURE !!!!!");
    return;
  }

  setImage(picture);

  const { uri } = image;
  const filename =
    "photos//" + userId + "//" + uri.substring(uri.lastIndexOf("/") + 1);
  const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

  setUploading(true);

  //setTransferred(0);

  //   const task = photoFirebaseStorage.ref(filename).putFile(uploadUri);

  const task = () => {
    //     //photoFirebaseStorage.ref(filename).putFile(uploadUri);
    const storageRef = ref(photoFirebaseStorage, filename);
    console.log("UPLOAD FAILED !!");
    uploadBytes(storageRef, uploadUri).then((snapshot) => {
      console.log("Image Uploaded !");
      imageDestination = snapshot.ref.fullPath;
      addImage(userId, imageDestination);
    });
  };

  useEffect(() => {
    task;
  }, []);
  // await uploadBytes(storageRef, uploadUri).then((snapshot) => {
  //   console.log("Image Uploaded !");
  //   imageDestination = snapshot.ref.fullPath;
  // });
  //   } catch (e) {
  //     console.error(e);
  //     console.log("UPLOAD FAILED !!");

  //     return;
  //   }
  //     // 'file' comes from the Blob or File API
  //     // .then((snapshot) => {
  //     //   console.log("Image Uploaded !");
  //     // });
  //   };
  // set progress state
  //   task.on("state_changed", (snapshot) => {
  //     setTransferred(
  //       Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //     );
  //   });

  //   try {
  //     await task;
  //   } catch (e) {
  //     console.error(e);
  //     return;
  //   }
  // setUploading(false);
  alert("Your photo has been uploaded to Firebase Cloud Storage!");
  setImage(null);
}
