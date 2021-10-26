import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer,
             } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from 'react-navigation-stack';
// import SideMenu from "./SideMenu";
// import { StatusBar } from 'expo-status-bar';
//import { enableScreens } from 'react-native-screens';
// import { Profile } from "./Profile";

import HomeView from "../views/HomeView";
import LocationRecordingView from "../views/LocationRecordingView";
import SignInView from "../views/SignInView";
import SignOnView from "../views/SignOnView";

// import MainPage from "pages/LocationRecording";
// import Home from "pages/Home";
// import { } from "../views/HomeView"
// import { } from "../views/MainPageView"
// import { } from "../views/SignInView"

// function HomeScreen() {
//     // return <SomeComponent />;
//     return <"SomeComponent" />;
//   }

 const StackNav = createNativeStackNavigator();
 const Drawer = createDrawerNavigator();


//const Stack = createStackNavigator();
// function SomeComponent() {
//   // We can access navigation object via context
//   const navigation = React.useContext(NavigationContext);


// }

// export const Navigation = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Profile">
//         {SideMenu.map((drawer) => (
//           <Drawer.Screen key={drawer.name} name={drawer.name} children={null} />
//         ))}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// const LoginStack = createNativeStackNavigator({
// 	Login: {
// 		screen: Login,
// 	},
// });

// const AppStack = createNativeStackNavigator({
// 	Home: {
// 		screen: Home,
// 	},
// 	MainPage: {
// 		screen: MainPage,
// 	},
// 	Profile: {
// 		screen: Profile,
// 	},
// });
// const AppStack = createStackNavigator({
// 	Home: {
// 		screen: HomeView },
// 	MainPage: {
// 		screen: MainPageView },
// 	Profile: {
// 		screen: Profile	},
// });

    //function navigation () {
    export const Navigation = () => {
       return (
          <NavigationContainer>          
            {/* <Drawer.Navigator initialRouteName="Hamb">
              {SideMenu.map((drawer) => (
                <Drawer.Screen key={drawer.name} name={drawer.name} children={null} />
              ))}
            </Drawer.Navigator> */}
            {/* <Stack.Navigator initialRouteName="Home"> */}
            <StackNav.Navigator initialRouteName="Home">
              
              <StackNav.Screen name="HomeView" component={HomeView} />
              <StackNav.Screen name="SignIn" component={SignInView} />
              <StackNav.Screen name="SignOn" component={SignOnView} />
              <StackNav.Screen name="Location" component={LocationRecordingView} />
            </StackNav.Navigator>
            {/* <AppStack/> */}
          </NavigationContainer>
      );
    }

    export default Navigation;
//}