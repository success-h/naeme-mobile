import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { androidId } from 'expo-application';
import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import {
  androidGoogleCliendId,
  expoGoogleCliendId,
  iosGoogleCliendId,
} from '../constants/credentials';
import { TokensType } from '../hooks/useCachedResources';
import { googleLoginOrRegister } from '../service/user';
import { User } from '../typings';

interface AuthProviderProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: () => void;
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
  username: null,
  email: null,
  image: undefined,
  auth_provider: null,
  id: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

const dummyUser: User = {
  email: 'succes@test.com',
  username: 'SUCCESS HYCENTH',
  image: '',
  auth_provider: 'google',
  id: 'uwebuob',
  tokens: {
    access: "qpvob'grf",
    refresh: "naeouho';e'b",
  },
};

interface Props {
  children: ReactNode;
  // user: User;
  // setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [_, googleResponse, googleAuth] = Google.useIdTokenAuthRequest({
    expoClientId: expoGoogleCliendId,
    scopes: ['profile', 'email'],
    iosClientId: iosGoogleCliendId,
    androidClientId: androidGoogleCliendId,
    selectAccount: true,
  });

  console.log({ user, setUser });

  useEffect(() => {
    if (!user?.email) {
      const url = 'https://naeme-api.herokuapp.com/api/account/user/';
      (async () => {
        setLoading(true);
        try {
          const jsonValue = await AsyncStorage.getItem('naemeUser');
          const tokens: TokensType =
            jsonValue != null ? JSON.parse(jsonValue) : null;
          if (tokens.access) {
            const response = await axios.get(url, {
              headers: { Authorization: `Bearer ${tokens.access}` },
            });
            const data: User = await response.data;
            if (data.email) {
              const jsonValue = JSON.stringify(user.tokens);
              setUser(data);
              setLoading(false);
            } else {
              setUser(defaultUser);
              setLoading(false);
            }
            return true;
          }
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      })();
    }
  }, []);

  const signInWithGoogle = async (id_token: string) => {
    try {
      const user = await googleLoginOrRegister(id_token);
      if (user) {
        const jsonValue = JSON.stringify(user.tokens);
        AsyncStorage.setItem('naemeUser', jsonValue)
          .then(() => {})
          .catch((e) => console.log(e));
        setUser(user);
        persistLogin(jsonValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      signInWithGoogle(id_token);
    }
  }, [googleResponse]);

  const persistLogin = (credential: string) => {
    AsyncStorage.setItem('naemeUser', credential)
      .then(() => {})
      .catch((e) => console.log(e));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => setUser(dummyUser),
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
