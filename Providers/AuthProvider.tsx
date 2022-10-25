import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

type User = { username: string; email: string; image: string } | null;
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

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>({
    email: "succes@test.com",
    username: "Success Hycenth",
    image:
      "https://res.cloudinary.com/dp3a4be7p/image/upload/v1666535340/person01_njmygc.png",
  });
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser = {
            username: "Bobo",
            email: "succes@test.com",
            image:
              "https://res.cloudinary.com/dp3a4be7p/image/upload/v1666534504/logo_nb3kab.png",
          };
          setUser(fakeUser);
        },
        logout: () => {
          setUser(null);
        },
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
