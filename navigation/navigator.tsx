import { NavigationContainer } from '@react-navigation/native';
import { useAuthContext } from '../hooks/useAuth';
import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './authStackNavigation';
import HomeNavigator from './HomeStackNavigation';

import useCachedResources from '../hooks/useCachedResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from '../components/SplashScreen';

interface TokensType {
  access: string;
  refresh: string;
}

const Navigation = () => {
  const { isLoadingComplete } = useCachedResources();
  const { loading, user } = useAuthContext();

  if (loading) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }

  if (!loading && isLoadingComplete) {
    return (
      <NavigationContainer linking={LinkingConfiguration}>
        {user?.email ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  }
};
export default Navigation;
