import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../components/hawker-stall-profile/HawkerStallProfile';
import ViewAllReports from '../components/hawker-stall-profile/ViewAllReports';
import ViewAllReviews from '../components/hawker-stall-profile/ViewAllReviews';
import ExplorePage  from '../components/explore-page/ExplorePage';
import MainPage from '../components/other-hawker-recommendations/MainPage';
import ReviewForm from '../components/userscreen-pages/ReviewForm';
import ReportForm from '../components/userscreen-pages/ReportForm';
import TakePic from '../components/user-functions/TakePic';

const UserStack = createStackNavigator();

export default function UserScreen() {
    return (
        <UserStack.Navigator initialRouteName="ExplorePage" screenOptions={{ headerShown: false }}>
          <UserStack.Screen name="ExplorePage" component={ExplorePage} />
          <UserStack.Screen name="MainPage" component={MainPage} />
          <UserStack.Screen name="Profile" component={Profile} />
          {/* <UserStack.Screen name="ReportForm" component={ReportForm} />
          <UserStack.Screen name="ReviewForm" component={ReviewForm} /> */}
          <UserStack.Screen name="ViewAllReports" component={ViewAllReports} />
          <UserStack.Screen name="ViewAllReviews" component={ViewAllReviews} />
          <UserStack.Screen name="TakePic" component={TakePic} />
        </UserStack.Navigator>
    );
}