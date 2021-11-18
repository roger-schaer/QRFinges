import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";


const Header = props => {



    return (
        <TouchableOpacity onPress={(event) =>
                   props.navigate.toggleDrawer()}
           >

               <Image style = {[styles.Image, {tintColor : 'darkgreen'}]}
                   source={{
                       uri: "https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png",
                   }}
               />
        </TouchableOpacity>

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