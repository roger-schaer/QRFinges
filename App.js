import React from "react";
// import Home from "./src/pages/Home";
import "./src/services/i18n";
import {
  NavigationContainer,
  createNativeStackNavigator,
} from "@react-navigation/native";
// import {
//   NavigationContext
// } from '@react-navigation/native';
// import Navigation from 'component/Nav_test';

import { Navigation } from "./src/component/Navigation";
import Profile from "./src/pages/Profile";

const App = () => {
  return (
    <Navigation />
    //  < Profile />
  );
};

export default App;

// const App = () => {
//   return navigator;
//   // (
//   //   <NavigationContainer>
//   //          {/* <Drawer.Navigator initialRouteName="SignIn">
//   //            {SideMenu.map((drawer) => (
//   //             <Drawer.Screen key={drawer.name} name={drawer.name} children={null} />
//   //           ))}
//   //         </Drawer.Navigator> */}
//   //         {/* <Stack.Navigator initialRouteName="Home"> */}
//   //         <StackNav.Navigator>
//   //           <StackNav.Screen name="Home" component={HomeView} />
//   //           <StackNav.Screen name="MainPage" component={MainPageView} />
//   //         </StackNav.Navigator>

//   //       </NavigationContainer>
//   // );
// };

// export default App;

// const StackNav = createNativeStackNavigator();
// // const StackNav = createStackNavigator();

// export const app = () => {
//   return (
//     <NavigationContainer>
//       {/* <Drawer.Navigator initialRouteName="SignIn">
//         {SideMenu.map((drawer) => (
//          <Drawer.Screen key={drawer.name} name={drawer.name} children={null} />
//        ))}
//      </Drawer.Navigator> */}
//      {/* <Stack.Navigator initialRouteName="Home"> */}
//      <StackNav.Navigator>
//        <StackNav.Screen name="home" component={HomeView} />
//        <StackNav.Screen name="mainPage" component={MainPageView} />
//      </StackNav.Navigator>
//    </NavigationContainer>
//  );
// }

// export default app;
