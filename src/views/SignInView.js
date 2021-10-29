import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
// import ToggleSwitch from 'toggle-switch-react-native'
import { Logo } from "../component/Logo";
import HomeView from "./HomeView";
//import { Navigation } from "../component/Navigation";
// import {isLoggedIn} from "../component/Nav_test"


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

// const [isEnabled, setIsEnabled] = useState(false);
// const toggleSwitch = () => setIsEnabled(previousState => !previousState);

// function useToggle(initialValue = false) {
//   const [isEnable, setIsEnabled] = React.useState(initialValue);
//   const [value, setValue] = React.useState(initialValue);
//   const toggle = React.useCallback(() => {
//     setValue(v => !v);
//   }, []);
//   return [value, toggle];
// }

const SignIn = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
            <Text style={styles.buttonText}>SIGN IN VIEW</Text>
          </View>
          <View>
            <Text style={styles.buttonText}>Finges</Text>        
            <Text>Connexion</Text>           
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.buttonText}>Map</Text>
            <Button
              onPress={() => props.navigation.navigate('Home', {screen : HomeView }) }
              title="Go to HomeView"
            />
            <Text style={styles.buttonText}>Experience</Text>
            {/* <Button title="Go back" onPress={() => navigation.goBack() } /> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignIn;