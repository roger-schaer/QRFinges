import React from "react";
import { Dimensions, Image, Text } from "react-native";

export const Logo = () => {
  return (
    <Image
      source={require("../assets/logo-QRFinges.png")}
      style={{
        height: 150,
        width: 400,
        resizeMode: "contain",
      }}
    />
  );
};
