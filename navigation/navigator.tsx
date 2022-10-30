import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useAuthContext } from '../Providers/AuthProvider';

import AuthNavigator from './authStackNavigation';
import HomeNavigator from './HomeStackNavigation';

export default function Navigation({}) {
  const { loading, setLoading, user, login } = useAuthContext();
  return (
    <NavigationContainer>
      {!user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
