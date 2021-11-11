import React from "react";
import {View, Text, Button} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import {CustomButton} from "../component/CustomButton";

export const InfoRegisteredUserView = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>helpCenterHead</Text>
            <Text style={styles.text}>myAccount</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>registerTrace</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>sendWalk</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>personalData</Text>
            <Text style={styles.content}>bla-bla</Text>

            <CustomButton onPress={() => props.navigation.navigate('Contact')}>refusalButton</CustomButton>
        </View>
    );
};
export default InfoRegisteredUserView;
