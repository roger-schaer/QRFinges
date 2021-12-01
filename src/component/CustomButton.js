import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const CustomButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderColor: "darkgreen",
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "darkgreen",
    alignItems: "center",
  },
});
