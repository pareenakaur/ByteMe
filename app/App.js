import { StyleSheet, Text } from "react-native";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import ViewAllReports from './components/hawker-stall-profile/ViewAllReports'
import ViewAllReviews from './components/hawker-stall-profile/ViewAllReviews';
import UserScreen from "./pages/UserScreen";
import ExplorePage from "./components/explore-page/ExplorePage";
import HeartScreen from "./pages/HeartScreen";
import ProfileScreen from "./pages/ProfileScreen"
import FirstPage from "./components/userscreen-pages/FirstPage";
import RegisterLogin from "./components/userscreen-pages/RegisterLogin";
import MainPage from "./components/other-hawker-recommendations/MainPage";
import Profile from "./components/hawker-stall-profile/HawkerStallProfile";
import FirstScreen from "./pages/FirstScreen";
import LoginTab from "./components/user-functions/LoginTab";
import RegisterTab from "./components/user-functions/RegisterTab";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import {
  PaperProvider,
  BottomNavigation,
} from "react-native-paper";
import TabNavigation from "./pages/TabNavigation";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer> 
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FirstPage" component={FirstPage} />
          <Stack.Screen name="RegisterLogin" component={RegisterLogin} />
          <Stack.Screen name="RegisterTab" component={RegisterTab} />
          <Stack.Screen name="LoginTab" component={LoginTab} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          {/* <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} /> */}  
        </Stack.Navigator>
      </NavigationContainer>
    
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
