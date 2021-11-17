import React from "react";
import "./src/services/i18n";
import 'react-native-gesture-handler';
import { UserProvider, useUserContext } from "./src/services/user-context";


import NavWithMenu from "./src/component/Navigation";


const App = () => {
    return (
        <UserProvider>
            <NavWithMenu/>
        </UserProvider>
    );
};

export default App;

