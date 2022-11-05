import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { googleLoginOrRegister } from '../service/user';
import { AuthRootStackParamList } from '../types';
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

const defaultUser = {
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
    // selectAccount: true,
  });

  useEffect(() => {
    const signInWithGoogle = async (id_token: string) => {
      try {
        const user = await googleLoginOrRegister(id_token);
        if (user) {
          setUser(user);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      signInWithGoogle(id_token);
    }
  }, [googleResponse]);

  // const googleRegister = async () => {
  //   try {
  //     const response = await googlePromptAsync();
  //     if (response.type === 'success') {
  //       const { id_token } = response.params;
  //       const user = await googleLoginOrRegister(id_token);
  //       if (user) {
  //         setUser(user);
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
