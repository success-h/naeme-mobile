import axios from 'axios';
import { endpoints } from '../constants/credentials';
import { User } from '../typings';

type DataRes = { data: User };

export const googleLoginOrRegister = async (idToken: string) => {
  if (idToken) {
    const { data }: DataRes = await axios.post(endpoints.google, {
      auth_token: idToken,
    });
    if (data) return data;
    return null;
  }
};
