import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Logo } from "../component/Logo";
import { styles } from "../component/styles";


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
