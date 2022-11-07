import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { User } from '../typings';

type Fonts = {
  'open-sans-bold': string;
  'open-sans-medium': string;
  'open-sans-regular': string;
  'open-sans-semi': string;
};

export interface TokensType {
  access: string;
  refresh: string;
}
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const url = 'https://naeme-api.herokuapp.com/api/token/refresh/';
  const checkLoginCredentials = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('naemeUser');
      const tokens: TokensType =
        jsonValue != null ? JSON.parse(jsonValue) : null;

      if (tokens.access) {
        axios
          .post(url, {
            refresh: tokens.refresh,
          })
          .then((response) => {
            const jsonValue = JSON.stringify(response.data);
            AsyncStorage.setItem('naemeUser', jsonValue)
              .then(() => {})
              .catch((e) => console.log(e));
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await checkLoginCredentials();
        await Font.loadAsync({
          'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
          'open-sans-medium': require('../assets/fonts/OpenSans-Medium.ttf'),
          'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-semi': require('../assets/fonts/OpenSans-SemiBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete };
}
