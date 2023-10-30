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

  
  {/*<PaperProvider>
  <StatusBar style="auto" />
   <View style={styles.container}>
    <Text>Map is here!</Text>
    <StatusBar style="auto" />
  </View> */}
  /*
    <PaperProvider>
        <StatusBar style="auto" />
    
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        activeColor="#FA4A0C"
      />
      </PaperProvider>
   */
  //LOAD FONTS
  const [fontsLoaded, fontError] = useFonts({
    'Open-Sans-Regular': require('./assets/fonts/Open_Sans/static/OpenSans-Regular.ttf'), 
    'Open-Sans-Bold': require('./assets/fonts/Open_Sans/static/OpenSans-Bold.ttf'), 
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  

  return (

    <PaperProvider>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
        {/*<Tab.Navigator 
          screenOptions={{ headerShown: false ,
            tabBarActiveTintColor: "#EB6C05",
            tabBarInactiveTintColor: "black",
            tabBarStyle: [
              {
                "display": "flex",
                "backgroundColor": "gold",
                "height": "8%",
                
              },
              null
            ],
            tabBarShowLabel: false,
          }}
          
          >
          <Tab.Screen 
            name="Explore" 
            component={UserScreen} 
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="search" size={24} color={color} />
              ),
          }} />
          <Tab.Screen 
            name="Saved" 
            component={HeartScreen} 
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="heart-outline" size={24} color={color} />
              ),
          }} />
          <Tab.Screen 
            name="Account" 
            component={ProfileScreen} 
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="person-outline" size={24} color={color} />
              ),
          }} />
          
        </Tab.Navigator> */}
      </NavigationContainer>
    
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
