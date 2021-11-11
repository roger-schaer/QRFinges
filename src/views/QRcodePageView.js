import React from "react";
import {View, Text, Button, TouchableOpacity} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { MaterialIcons } from '@expo/vector-icons';

const QRcodeView = (props) => {
    return (
        <View style={styles.screen}>

            <Text> Zone de scanning du QR code </Text>
            <TouchableOpacity onPress={() => console.log("go to external webpage")}>
             <Text>
                 html_link_to_external_website
             </Text>
            </TouchableOpacity>
            <MaterialIcons name="add-a-photo" size={24} style={styles.iconContainer} />
        </View>
    );
};

export default QRcodeView;