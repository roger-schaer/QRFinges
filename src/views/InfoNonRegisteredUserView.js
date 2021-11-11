import React from "react";
import {View, Text, Button} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import {CustomButton} from "../component/CustomButton";


export const InfoNonRegisteredUserView = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>infoHead</Text>
            <Text style={styles.text}>createAccount</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>followTuto</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>sendWalk</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>personalData</Text>
            <Text style={styles.content}>bla-bla</Text>

            <CustomButton onPress={() => props.navigation.navigate('CreateProfile')}>acceptButton</CustomButton>

            <CustomButton onPress={() => props.navigation.navigate('Contact')}>refusalButton</CustomButton>

        </View>
    );
};
export default InfoNonRegisteredUserView;