import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types/types';
import EditEventModal from '../screens/EditEventModal';
import HomeScreen from '../screens/tabs/HomeScreen';
import TabNavigator from './TabNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

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

      <Stack.Group>
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen name="EditEventModal" component={EditEventModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
