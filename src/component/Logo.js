import React from "react";
import { Dimensions, Image, Text } from "react-native";


export const Logo = () => {
  return (
    <Image
      source={require('../assets/logo_QRFinges.png')}
      style={{
          height : 150,
          width : 250,
          marginBottom : 20,
          resizeMode: 'contain',

      }}
    />
  );
};
