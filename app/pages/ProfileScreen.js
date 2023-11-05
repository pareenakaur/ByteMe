import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from '../components/userscreen-pages/ProfilePage';
import FavouriteHawkers from '../components/userscreen-pages/FavouriteHawkers';



const ProfileStack = createStackNavigator();

export default function ProfileScreen() {
    return (
      <ProfileStack.Navigator initialRouteName="ProfilePage" screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
        <ProfileStack.Screen name="FavouriteHawkers" component={FavouriteHawkers} />

      </ProfileStack.Navigator>
    );
}