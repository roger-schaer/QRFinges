import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";

const Header = props => {
    return (
       <View>
           <Text>              </Text>
           <TouchableOpacity
               onPress={(event) =>
                   console.log("Hamburger")
               }
           >
               <Image style = {[styles.Image, {tintColor : 'darkgreen'}]}
                   source={{
                       uri: "https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png",
                   }}
               />
           </TouchableOpacity>
       </View>
    );
};

const styles = StyleSheet.create ({
    Image : {
        width: 35,
        height: 35,
        marginLeft: 15,
        tintColor : 'darkgreen',
    },
});

export default Header;