import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { Logo } from "../component/Logo";
import { Navigation } from "../component/Navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "#087940",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
const HomeView = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            console.log("Hamburger");
          }}
        >
          <Image
            source={{
              uri: "https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png",
            }}
            style={{ width: 35, height: 35, marginLeft: 15 }}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={{ marginBottom: 50 }}>
            <Logo />
          </View>
          <View>
            <Text style={styles.buttonText}>Finges</Text>
            <Text style={styles.buttonText}>Map</Text>
            <Text style={styles.buttonText}>Experience</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeView;
