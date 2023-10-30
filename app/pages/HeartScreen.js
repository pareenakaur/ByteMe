import { createStackNavigator } from '@react-navigation/stack';
import FavouriteHawkers from '../components/userscreen-pages/FavouriteHawkers';


const HeartStack = createStackNavigator();

export default function HeartScreen() {
    return (
      <HeartStack.Navigator initialRouteName="FavouriteHawkers" screenOptions={{ headerShown: false }}>
        <HeartStack.Screen name="FavouriteHawkers" component={FavouriteHawkers} />
      </HeartStack.Navigator>
    );
}