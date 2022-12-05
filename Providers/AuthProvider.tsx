import {
  androidGoogleCliendId,
  expoGoogleCliendId,
  iosGoogleCliendId,
  serverUrl,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TokensType } from '../hooks/useCachedResources';
import { googleLoginOrRegister } from '../service/user';
import { User } from '../types/typings';

interface AuthProviderProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
  loading: boolean;
  setLoading(loading: boolean): void;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  googleAuth: (
    options?: AuthRequestPromptOptions | undefined
  ) => Promise<AuthSessionResult>;
}

export const AuthContext = createContext({} as AuthProviderProps);

export const defaultUser = {
  name: null,
  email: null,
  image: undefined,
  auth_provider: null,
  id: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  const [_, googleResponse, googleAuth] = Google.useIdTokenAuthRequest({
    expoClientId: expoGoogleCliendId,
    iosClientId: iosGoogleCliendId,
    androidClientId: androidGoogleCliendId,
    scopes: ['profile', 'email'],
    selectAccount: true,
  });

  useEffect(() => {
    if (!user?.email) {
      (async () => {
        const url = `${serverUrl}/account/user/`;
        const user = await fetchUser(url);
        if (user) {
          setUser(user);
          setLoading(false);
          return true;
        }
        return true;
      })();
    }
  }, []);

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      signInWithGoogle(id_token);
    }
  }, [googleResponse]);

  const signInWithGoogle = async (id_token: string) => {
    try {
      const user = await googleLoginOrRegister(id_token);
      if (user) {
        const jsonValue = JSON.stringify(user?.tokens);
        const returnedJson = await AsyncStorage.setItem('naemeUser', jsonValue);
        setUser(user);
        persistLogin(jsonValue);
        return user;
      }
    } catch (e) {
      throw e;
    }
  };

  const fetchUser = async (url: string) => {
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (tokens !== null) {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${tokens.access}` },
      });
      const data: User = await response.data;
      if (data?.email) {
        setLoading(false);
        return data;
      } else {
        setUser(defaultUser);
        return null;
      }
    }

    setLoading(false);
    return null;
  };

  const persistLogin = async (credential: string) => {
    await AsyncStorage.setItem('naemeUser', credential).catch((e) => {
      throw e;
    });
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout: () => {
          setUser(defaultUser);
        },
        loading,
        setLoading,
        accessToken,
        setAccessToken,
        googleAuth,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
