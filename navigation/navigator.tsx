import { NavigationContainer } from '@react-navigation/native';
import { useAuthContext } from '../hooks/useAuth';
import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './authStackNavigation';
import HomeNavigator from './HomeStackNavigation';
import * as Updates from 'expo-updates';

import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import useCachedResources from '../hooks/useCachedResources';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from '../components/SplashScreen';

interface TokensType {
  access: string;
  refresh: string;
}

const Navigation = () => {
  const { isLoadingComplete } = useCachedResources();
  const { loading, setLoading, user, login, setUser } = useAuthContext();

  if (loading) {
    console.log(loading);
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }

  if (!loading && isLoadingComplete) {
    return (
      <NavigationContainer linking={LinkingConfiguration}>
        {user.email ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  }
};
export default Navigation;
