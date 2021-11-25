import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Logo } from "../component/Logo";
import { styles } from "../component/styles";
import { getStorageData } from "../services/storage";
import { useUserContext } from "../services/user-context";
import { USER_ID } from "../utils/request";

const HomeView = (props) => {
  const { state, dispatch } = useUserContext();

  useEffect(() => {
    getStorageData(USER_ID).then((v) => {
      console.log(v);
      if (v !== null) {
        dispatch({
          type: "SET_LOGIN",
          userId: v,
          isLoggedIn: true,
        });
      }
    });
  }, []);


  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50 }}>
        <Logo />
      </View>
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("LoginPageView")}>
          <Text style={styles.buttonText}>Finges</Text>
          <Text style={styles.buttonText}>Map</Text>
          <Text style={styles.buttonText}>Experience</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeView;
