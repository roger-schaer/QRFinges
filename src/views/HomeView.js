import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { Logo } from "../component/Logo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#f5f5f5",
  },
  buttonText: {
    fontSize: 40,
    color: "#087940",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
const HomeView = (props) => {
  return (
        <View style={styles.container}>
          <View style={{ marginBottom: 50 }}>
            <Logo />
          </View>
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate("LoginPage")}>
              <Text style={styles.buttonText}>Finges</Text>
              <Text style={styles.buttonText}>Map</Text>
              <Text style={styles.buttonText}>Experience</Text>
            </TouchableOpacity>

          </View>
        </View>
  );
};
export default HomeView;
