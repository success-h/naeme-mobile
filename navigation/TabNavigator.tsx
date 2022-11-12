import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Icon } from '@rneui/themed';
import { RootTabParamList } from '../types/types';
import HomeScreen from '../screens/tabs/HomeScreen';
import TicketScreen from '../screens/tabs/TicketScreen';
import ScannerScreen from '../screens/tabs/ScanScreen';
import UserScreen from '../screens/tabs/UserScreen';
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';

interface TabNavigatorProps {}

const Tab = createBottomTabNavigator<RootTabParamList>();

export type useTabNavigationProps = BottomTabScreenProps<
  RootTabParamList,
  'Home'
>;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#060707',
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#dddddd',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <Feather
                name="home"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          } else if (route.name === 'Ticket') {
            return (
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          } else if (route.name === 'Scan') {
            return (
              <MaterialIcons
                name="qr-code"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          } else if (route.name === 'User') {
            return (
              <AntDesign
                name="user"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ticket" component={TicketScreen} />
      <Tab.Screen name="Scan" component={ScannerScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
