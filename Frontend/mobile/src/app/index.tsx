import DashboardScreen from '@/houseadmin/screens/Dashboard';
import GuestTabNavigator from '../navigation/GuestTabNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function Index() {
  return (
    <NavigationContainer>
      <GuestTabNavigator />
    </NavigationContainer>
  );
}
