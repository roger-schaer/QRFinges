import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CustomButton } from "../component/CustomButton";
import { auth } from "../services/firebase";

const CreateProfilePageView = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    console.log("sign up method called ")
    try{
    const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <View>
      <View style={styles.screen}>
        <Text style={styles.title}>createAccount</Text>
        <TextInput
          placeholder={"pseudo"}
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
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={"email"}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        <TextInput
          placeholder={"confirmPass"}
          placeholderTextColor={"darkgreen"}
          style={styles.input}
        />
        
        <CustomButton onPress={handleSignup}>
          create
        </CustomButton>

        {/*<CustomButton onPress={(event) => {handleSignup; props.navigation.navigate("Profile")}}>
          create
        </CustomButton>*/}
        
        <Button onPress={handleSignup} title="btn"></Button>
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
