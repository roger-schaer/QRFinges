import React from "react";
import "./src/services/i18n";
import 'react-native-gesture-handler';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider, useUserContext } from "./src/services/user-context";
import NavWithMenu from "./src/component/Navigation";
import LoginPageView from "./src/views/LogInPageView";
import ProfileView from "./src/views/ProfileView";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        /*
        <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={LoginPageView} />
            <Stack.Screen name="profile" component={ProfileView} />
        </Stack.Navigator>
        </NavigationContainer>
        */
        /*
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPageView/>}/>
                    <Route path="/profile" element={<ProfileView/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
        */
        

        <UserProvider>
            <NavWithMenu/>
        </UserProvider>
    );
};

export default App;

