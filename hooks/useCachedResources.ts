import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { serverUrl } from '@env';

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

  const url = `${serverUrl}/token/verify/`;
  const checkLoginCredentials = async () => {
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (tokens) {
      axios
        .post(url, {
          token: tokens.access,
        })
        .then((response) => {
          console.log(response.status);
          const jsonValue = JSON.stringify(response.data);
          if (response.status === 200) {
            console.log({ jsonValue });
            return;
          } else {
            axios
              .post(`${serverUrl}/token/refresh/`, {
                refresh: tokens.refresh,
              })
              .then((response) => {
                if (response.status === 200) {
                  const jsonValue = JSON.stringify(response.data);
                  AsyncStorage.setItem('naemeUser', jsonValue)
                    .then((r) => {
                      r;
                    })
                    .catch((e) => {
                      throw e;
                    });
                }
                return;
              })
              .catch((error) => {
                console.log(error);
                return error;
              });
          }

          return;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    }

    return null;
  };

  useEffect(() => {
    (async () => {
      try {
        SplashScreen.preventAutoHideAsync();
        await checkLoginCredentials();
        await Font.loadAsync({
          'open-sans-medium': require('../assets/fonts/OpenSans-Medium.ttf'),
          'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
          'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-semi': require('../assets/fonts/OpenSans-SemiBold.ttf'),
        });
      } catch (e) {
        throw e;
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  return { isLoadingComplete };
}
