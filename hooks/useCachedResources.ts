import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts } from 'expo-font';

type Fonts = {
  'open-sans-bold': string;
  'open-sans-medium': string;
  'open-sans-regular': string;
  'open-sans-semi': string;
};

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // const [fontsLoaded] = useFonts({
        //   'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
        //   'open-sans-medium': require('../assets/fonts/OpenSans-Medium.ttf'),
        //   'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        //   'open-sans-semi': require('../assets/fonts/OpenSans-SemiBold.ttf'),
        // });
        await Font.loadAsync({
          'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
          'open-sans-medium': require('../assets/fonts/OpenSans-Medium.ttf'),
          'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-semi': require('../assets/fonts/OpenSans-SemiBold.ttf'),
        });
        // await Font.loadAsync(Entypo.font);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
