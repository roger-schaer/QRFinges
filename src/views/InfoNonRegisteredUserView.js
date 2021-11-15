import React from "react";
import {View, Text, Button} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import {CustomButton} from "../component/CustomButton";
import CreateProfilePageView from "./CreateProfilePageView";


const InfoNonRegisteredUserView = (props) => {

    const { t, i18n } = useTranslation();

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{t("infoHead")}</Text>
            <Text style={styles.text}>{t("createAccount")}</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>{t("followTuto")}</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>{t("sendWalk")}</Text>
            <Text style={styles.content}>bla-bla</Text>

            <Text style={styles.text}>{t("personalData")}</Text>
            <Text style={styles.content}>bla-bla</Text>

            <CustomButton onPress={() => props.navigation.navigate('subscribe')}>{t("acceptButton")}</CustomButton>

            <CustomButton onPress={() => props.navigation.navigate('contact')}>{t("refusalButton")}</CustomButton>

        </View>
    );
};
export default InfoNonRegisteredUserView;