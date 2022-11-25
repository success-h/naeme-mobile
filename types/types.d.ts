/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { EventDataTypes, PaidTicketDataTypes, User } from './typings';

export type AuthRootStackParamList = {
  SignIn: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  User: undefined;
  Ticket: undefined;
  Scan: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  EditEventModal: EventDataTypes;
  PaymentModal: undefined;
  Detail: EventDataTypes;
  CreateEvent: User;
  CreateTicket: undefined;
  TicketCart: EventDataTypes;
  MyTicketDetail: PaidTicketDataTypes;
  NotFound: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthRootStackParamList> =
  NativeStackScreenProps<AuthRootStackParamList, Screen>;

export type RootStackScreenProp<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type TabScreenProps<T extends keyof RootTabParamList> = {
  navigation: NativeStackNavigationProp<RootTabParamList, T>;
  route: RouteProp<RootTabParamList, T>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
