import HeartScreen from "./HeartScreen";
import ProfileScreen from "./ProfileScreen";
import UserScreen from "./UserScreen";
import { Ionicons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return(
        <Tab.Navigator 
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
          
        </Tab.Navigator>
    );
}

export default TabNavigation;