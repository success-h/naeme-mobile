import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ScreensNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Details',
  'Home'
>;

type RootStackParamList = {
  Home: undefined;
  Details: {
    data: {
      id: string;
      name: string;
      creator: string;
      price: number;
      description: string;
      image: number;
      bids: {
        id: string;
        name: string;
        price: number;
        image: number;
        date: string;
      }[];
    };
  };
};

type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
