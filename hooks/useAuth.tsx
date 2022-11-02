import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

export function useAuthContext() {
  return useContext(AuthContext);
}
