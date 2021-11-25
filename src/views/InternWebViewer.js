import React, { useCallback, useEffect, useState } from "react";
import {View, Text, Button, TouchableOpacity, Linking, SafeAreaView, StatusBar} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

const webViewer = (props) => {
    const isFocused = useIsFocused();
 let uri = props.route.params.uri ;

console.log(props.route);
 console.log(uri);

  return (

    <WebView
      style = {styles.webviewer}
      source = { {uri : uri }}
    />


  );

}

export default webViewer;
 