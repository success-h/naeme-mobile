import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import ModalScreen from '../screens/EditEventModal';
import NotFoundScreen from '../screens/NotFoundScreen';
import UserScreen from '../screens/UserScreen';
import { HomeRootStackParamList } from '../types';
import EditEventModal from '../screens/EditEventModal';

const Stack = createNativeStackNavigator<HomeRootStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="EditEventModal" component={EditEventModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
