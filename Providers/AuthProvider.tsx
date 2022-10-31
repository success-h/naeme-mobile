import { createContext, ReactNode, useContext, useState } from 'react';

interface User {
  username: SringOrNull;
  email: SringOrNull;
  image: string | undefined;
}

interface AuthProviderProps {
  user: User;
  login: () => void;
  logout: () => void;
  loading: boolean;
  setLoading(loading: boolean): void;
}

const AuthContext = createContext({} as AuthProviderProps);
export function useAuthContext() {
  return useContext(AuthContext);
}

const defaultUser = {
  email: null,
  username: null,
  image: undefined,
};

const dummyUser: User = {
  email: 'succes@test.com',
  username: 'Success Hycenth',
  image:
    'https://res.cloudinary.com/dp3a4be7p/image/upload/v1667144942/1b8a251475e711e3ddcc68ff6511ea34_skv5b6.jpg',
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
