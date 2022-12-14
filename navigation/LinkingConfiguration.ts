import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AuthRootStackParamList, RootStackParamList } from '../types/types';

const linking: LinkingOptions<RootStackParamList & AuthRootStackParamList> = {
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
      CreateEvent: 'CreateEvent',
      CreateTicket: 'CreateTicket',
      TicketCart: 'TicketCart',
      MyTicketDetail: 'MyTicketDetail',
    },
  },
};
export default linking;
