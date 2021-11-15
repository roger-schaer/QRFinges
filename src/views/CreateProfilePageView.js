import React, {useState} from "react";
import {View, Text, Button, StyleSheet, TextInput} from "react-native";
import {handleSignup} from '../services/firebase'
import {CustomButton} from "../component/CustomButton";

const CreateProfilePageView = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');


    return (
        <View>
            <View style={styles.screen}>
                <Text style={styles.title}>createAccount</Text>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder={"email"}
                    placeholderTextColor={"darkgreen"}
                    style={styles.input}
                    keyboardType={'email-address'}
                />
                <TextInput
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder={"name"}
                    placeholderTextColor={"darkgreen"}
                    style={styles.input}
                />
                <TextInput
                    value={firstname}
                    onChangeText={text => setFirstname(text)}
                    placeholder={"firstname"}
                    placeholderTextColor={"darkgreen"}
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder={"pass"}
                    placeholderTextColor={"darkgreen"}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    placeholder={"confirmPass"}
                    placeholderTextColor={"darkgreen"}
                    style={styles.input}
                />


                <CustomButton onPress={(event) => {
                    handleSignup(email, password, name, firstname).then(() => {
                        props.navigation.navigate("Profile");
                    }).catch(e => {
                        console.log(e)
                    });
                }}>
                    create
                </CustomButton>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 50,
        paddingTop: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "darkgreen",
        padding: 10,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        height: 30,
        borderBottomColor: "darkgreen",
        borderBottomWidth: 1,
        marginVertical: 10,
        marginBottom: 20,
    },
    text: {
        color: "darkgreen",
        fontSize: 20,
    },
});

export default CreateProfilePageView;
