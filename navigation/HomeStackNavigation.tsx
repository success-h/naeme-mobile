import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { HomeRootStackParamList } from '../types';
import EditEventModal from '../screens/EditEventModal';
import HomeScreen from '../screens/tabs/HomeScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<HomeRootStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EditEventModal" component={EditEventModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
