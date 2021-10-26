import React from "react";
import { Dimensions, Image, Text } from "react-native";

export const Logo = () => {
  return (
    <Image
      source={{uri : 'assets:/splash.png'}}
      style={{
        height: 150,
        width: 400,
        resizeMode: "contain",
      }}
    />
  );
};
