/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type AuthRootStackParamList = {
  SignIn: undefined;
};

export type HomeRootStackParamList = {
  Home: undefined;
  EditEventModal: DataProps;
  PaymentModal: undefined;
  Modal: undefined;
  Detail: DataProps;
  NotFound: undefined;
  User: undefined;
};

export type HomeStackScreenProps<Screen extends keyof HomeRootStackParamList> =
  NativeStackScreenProps<HomeRootStackParamList, Screen>;

export type AuthStackScreenProps<Screen extends keyof AuthRootStackParamList> =
  NativeStackScreenProps<AuthRootStackParamList, Screen>;

// export type ModalScreenNavigationProps = CompositeNavigationProp<
//   NativeStackNavigationProp<HomeRootStackParamList, "Home">,
//   NativeStackNavigationProp<AuthRootStackParamList, "SignIn">
// >;

// export type NavigationProps<T extends keyof HomeRootStackParamList> =
//   CompositeNavigationProp<
//     NativeStackNavigationProp<HomeRootStackParamList, T>,
//     NavigationProp<HomeRootStackParamList, T>
//   >;

export type ModalScreenProps<T extends keyof HomeRootStackParamList> = {
  navigation: NativeStackNavigationProp<HomeRootStackParamList, T>;
  route: RouteProp<HomeRootStackParamList, T>;
};
