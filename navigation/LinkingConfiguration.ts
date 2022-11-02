import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AuthRootStackParamList, HomeRootStackParamList } from '../types';

const linking: LinkingOptions<HomeRootStackParamList & AuthRootStackParamList> =
  {
    prefixes: [Linking.createURL('/')],
    config: {
      screens: {
        Main: {
          screens: {
            Home: 'Home',
            Scan: 'Scan',
            Ticket: 'Ticket',
            User: 'User',
          },
        },
        Detail: 'Detail',
        EditEventModal: 'EditEventModal',
        PaymentModal: 'PaymentModal',
        NotFound: 'NotFound',
        SignIn: 'SignIn',
      },
    },
  };
export default linking;
