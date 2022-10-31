import { Text, View, StyleSheet, Animated, Image } from 'react-native';
import { Entypo, AntDesign, Octicons, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { Countdown } from '../../Utils/CountDown';
import { HomeRootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export type NavigationProps = NativeStackNavigationProp<
  HomeRootStackParamList,
  'EditEventModal'
>;

const Max_Header_Height = 460;
const Min_Header_Height = 0;
const Scroll_Distance = Max_Header_Height - Min_Header_Height;

const DynamicHeader = ({
  animHeaderValue,
  data,
}: {
  data: EventProps;
  animHeaderValue: any;
}) => {
  const animatedHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Max_Header_Height, Min_Header_Height],
    extrapolate: 'clamp',
  });

  return (
    <Animated.Image
      style={[
        {
          height: animatedHeaderHeight,
        },
      ]}
      source={{ uri: data?.image }}
      className="h-[460px] rounded-3xl shadow-2xl shadow-slate-500 -z-20"
      resizeMode="cover"
    />
  );
};

export default DynamicHeader;
