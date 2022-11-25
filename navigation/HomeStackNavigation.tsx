import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types/types';
import HomeScreen from '../screens/tabs/HomeScreen';
import TabNavigator from './TabNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import TicketCartScreen from '../screens/TicketCartScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import MyTicketDetailScreen from '../screens/MyTicketDetailScreen';

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
        <Stack.Screen
          name="CreateTicket"
          component={CreateTicketScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTicketDetail"
          component={MyTicketDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen
          name="TicketCart"
          component={TicketCartScreen}
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
