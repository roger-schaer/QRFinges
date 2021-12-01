import React from "react";
import { styles } from "../component/styles";
import { WebView } from "react-native-webview";

const WebViewer = (props) => {
  let uri = props.route.params.uri;
  return <WebView style={styles.container} source={{ uri: uri }} />;
};

export default WebViewer;
