import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import { useTranslation } from "react-i18next";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from "../component/styles";

const ContactPageView = (props) => {
    return (
        <View style={contactPageStyle.screen}>
            <View style={contactPageStyle.row}>
                <AntDesign name={"phone"}  size={30} style={styles.iconContainer}/>
                <Text style={contactPageStyle.text}>+41265639843</Text>
            </View>

            <View style={contactPageStyle.row}>
                <AntDesign name={"mail"} size={30} style={styles.iconContainer}/>
                <Text style={contactPageStyle.text}>qrfinges@finges.ch</Text>
            </View>

           <View style={contactPageStyle.row}>
               <FontAwesome name={"address-book"} size={30} style={styles.iconContainer}/>
               <Text style={contactPageStyle.text}>Sierre</Text>
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

    row : {
        flexDirection: "row",
    },

    text : {
        fontSize: 16,
        color: "darkgreen",
        paddingBottom: 15,
        paddingTop : 15,
    }
});

export default ContactPageView;