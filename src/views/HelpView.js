import React from "react";
import {View, Text, Button} from "react-native";



const HelpView = (props) => {
    return (
        <View>

            <Text> Ici toutes les questions fréquentes </Text>
            <Button
                onPress={() => props.navigation.navigate('Contact') }
                title={"N'hésitez pas à nous contacter"}/>
            <View>
                <Button title="Go back" onPress={() => props.navigation.goBack() } />
            </View>
        </View>
    );
};
export default HelpView;
