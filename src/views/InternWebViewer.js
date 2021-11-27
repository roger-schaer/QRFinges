import React from "react";
import { styles } from "../component/styles";
import { useIsFocused } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

const WebViewer = (props) => {
 let uri = props.route.params.uri ;

console.log(props.route);
 console.log(uri);

  return (

    <WebView
      style = {styles.container}
      source = { {uri : uri} }
    />


  );

}

export default WebViewer;
 