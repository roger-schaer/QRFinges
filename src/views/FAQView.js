import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { CustomButton } from "../component/CustomButton";
import { CONTACT_KEY, SUBSCRIBE_KEY } from "../constant/contants";

const FAQView = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <ScrollView style={styles.scrollView} scrollIndicatorInsets={{ left: 1 }}>
      <View>
        <Text style={styles.title}>{t("faq_title_projectExplanation")}</Text>
        <Text style={styles.content}>
          {t("faq_content_projectExplanation")}
        </Text>

        <Text style={styles.title}>
          {t("faq_title_participationExplanation")}
        </Text>
        <Text style={styles.content}>
          {t("faq_content_participationExplanation")}
        </Text>

        <Text style={styles.title}>{t("faq_title_accountCreation")}</Text>
        <Text style={styles.content}>{t("faq_content_accountCreation")}</Text>

        <Text style={styles.title}>{t("faq_title_dataStorage")}</Text>
        <Text style={styles.content}>{t("faq_content_dataStorage")}</Text>

        <Text style={styles.title}>{t("faq_title_deleteData")}</Text>
        <Text style={styles.content}>{t("faq_content_deleteData")}</Text>

        <Text style={styles.title}>{t("faq_title_deleteAccount")}</Text>
        <Text style={styles.content}>{t("faq_content_deleteAccount")}</Text>

        <CustomButton onPress={() => props.navigation.navigate(CONTACT_KEY)}>
          {t("refusalButton")}
        </CustomButton>
      </View>
    </ScrollView>
  );
};
export default FAQView;
