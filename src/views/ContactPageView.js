import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../component/styles";

const ContactPageView = () => {
  return (
    <View style={contactPageStyle.screen}>
      <View style={contactPageStyle.row}>
        <AntDesign name={"home"} size={30} style={styles.iconContainer} />
        <Text style={contactPageStyle.text}>
          Parc naturel régional Pfyn-Finges{"\n"}
          Case postale 65{"\n"}
          CH - 3970 Salquenen
        </Text>
      </View>

      <View style={contactPageStyle.row}>
        <AntDesign name={"phone"} size={30} style={styles.iconContainer} />
        <Text
          style={contactPageStyle.text}
          onPress={() => Linking.openURL("tel:+41 27 452 60 60")}
        >
          +41 (0)27 452 60 60
        </Text>
      </View>

      <View style={contactPageStyle.row}>
        <AntDesign name={"mail"} size={30} style={styles.iconContainer} />
        <Text
          style={contactPageStyle.text}
          onPress={() =>
            Linking.openURL(
              "mailto:admin@pfyn-finges.ch?subject=Renseignements concernant QRFinges"
            )
          }
        >
          admin@pfyn-finges.ch
        </Text>
      </View>
    </View>
  );
};

const contactPageStyle = StyleSheet.create({
  screen: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
  },

  row: {
    flexDirection: "row",
  },

  text: {
    fontSize: 16,
    color: "darkgreen",
    paddingBottom: 15,
    paddingTop: 15,
  },
});

export default ContactPageView;
