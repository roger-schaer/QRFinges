import React from "react";
import {View, Text, Button} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";


export const InfoNonRegisteredUserView = (props) => {
    return (
        <View>
            <Header/>
            <Button
                onPress={() => { props.navigation.navigate('CreateProfile'),
                 console.log("Formulaire de création de compte")} }
                title={"Je crée mon compte"}/>
                <Text/>
               <Button
                   onPress={() => { props.navigation.navigate('Contact'),
                    console.log("Contact page")} }
                   title={"J'ai encore des questions > nous contacter"}/>
            <View>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </View>
        </View>
    );
};
export default InfoNonRegisteredUserView;