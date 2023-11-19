import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from '../components/userscreen-pages/FirstPage';
// import RegisterLogin from '../components/userscreen-pages/RegisterLogin';
import LoginTab from '../components/user-functions/LoginTab';
import RegisterTab from '../components/user-functions/RegisterTab';
import ResetPassword from '../components/user-functions/ResetPassword';



const FirstStack = createStackNavigator();

export default function FirstScreen() {
    return (
      <FirstStack.Navigator initialRouteName="FirstPage" screenOptions={{ headerShown: false }}>
        <FirstStack.Screen name="FirstPage" component={FirstPage} />
        <FirstStack.Screen name="LoginTab" component={LoginTab} />
        <FirstStack.Screen name="RegisterTab" component={RegisterTab} />
        <FirstStack.Screen name="ResetPassword" component={ResetPassword} />
      </FirstStack.Navigator>
    );
}