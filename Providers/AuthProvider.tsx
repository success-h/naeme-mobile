import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { googleLoginOrRegister } from '../service/user';
import { AuthRootStackParamList } from '../types';
import { User } from '../typings';

export type useAuthNavigationProps = NativeStackNavigationProp<
  AuthRootStackParamList,
  'SignIn'
>;

interface AuthProviderProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: () => void;
  logout: () => void;
  loading: boolean;
  setLoading(loading: boolean): void;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  googleRegister: () => Promise<void>;
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

  const [_, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      '919602408222-pj590en2tl3supl5km6jba6k31oegpgv.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    // iosClientId:
    //   '1080382822276-a0ms51p5cfc523bivhchs8nk04u2scq0.apps.googleusercontent.com',
    // androidClientId:
    //   '1080382822276-dqohv9donltabnijor1uun2765hstr4v.apps.googleusercontent.com',
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // selectAccount: true,
  });

  const googleRegister = async () => {
    const response = await googlePromptAsync();
    if (response.type === 'success') {
      const { id_token } = response.params;
      const user = await googleLoginOrRegister(id_token);
      if (user) {
        setUser(user);
      }
    }
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
        googleRegister,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
