import React, { useEffect } from "react";
import { View } from "react-native";
import { firebaseDb } from "../config/firebaseDb";
import { getUsers, getUserScannedQrCodes } from "../services/firebase";

export const FirebaseView = () => {
  const dbRef = firebaseDb.firestore().collection("users");

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      users.forEach((u) => {
        console.log(u.id, u.data());
      });
    })();
    /* getUsers()
      .get()
      .then((d) => {
        d.forEach((r) => {
          getUserScannedQrCodes(r)
            .get()
            .then((sad) => {
              sad.forEach((element) => {
                console.log(element.data());
              });
            });
          console.log(r.id);
        });
      }); */
    // dbRef.onSnapshot(getCollection);
  }, []);
  return <View></View>;
};
