import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn';
import { AuthRootStackParamList, RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<AuthRootStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Group>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AuthNavigator;
