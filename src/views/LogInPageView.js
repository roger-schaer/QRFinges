import React from "react";
import {View, Text, Button} from "react-native";
import Header from "../component/Header";
import { useTranslation } from "react-i18next";


export const LoginPageView = (props) => {
    return (
        <View>
            <Header/>
                <Button
                onPress={() => { props.navigation.navigate('Profile'),
                 console.log("go to Profile")} }
                title={"Se connecter"}/>
                <Text/>
                <Button
                onPress={()=> { props.navigation.navigate('InfoNonRegisteredUser'),
                 console.log("go to CreateProfilePage")} }
                title={"S'inscrire"}/>
            <View>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </View>
        </View>
    );
};
export default LoginPageView;
