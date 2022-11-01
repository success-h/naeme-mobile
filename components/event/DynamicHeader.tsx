// import {
//   Text,
//   View,
//   StyleSheet,
//   Animated,
//   Image,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import { Entypo, AntDesign, Octicons, Ionicons } from '@expo/vector-icons';
// import { HomeRootStackParamList } from '../../types';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import MapView, { Marker } from 'react-native-maps';

// export type useNavigationProps = NativeStackNavigationProp<
//   HomeRootStackParamList,
//   'EditEventModal'
// >;

// const Max_Header_Height = 460;
// const Min_Header_Height = 70;
// const Scroll_Distance = Max_Header_Height - Min_Header_Height;

// const DynamicHeader = ({
//   animHeaderValue,
//   data,
// }: {
//   data: EventProps;
//   animHeaderValue: any;
// }) => {
//   const animatedHeaderHeight = animHeaderValue.interpolate({
//     inputRange: [0, Scroll_Distance],
//     outputRange: [Max_Header_Height, Min_Header_Height],
//     extrapolate: 'clamp',
//   });

//   const navigation = useNavigation<useNavigationProps>();

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('EditEventModal', { data })}
//         className={` ${
//           Platform.OS === 'ios' ? 'top-4' : 'top-12'
//         } bg-[#555556] shadow-sm shadow-gray-500 z-30 absolute rounded-full right-5 items-center p-2`}
//       >
//         <Entypo name="edit" size={17} color="white" />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         className={` ${
//           Platform.OS === 'ios' ? 'top-4' : 'top-12'
//         } bg-[#555556] shadow-sm shadow-gray-500 z-30 absolute rounded-full left-5 items-center p-2`}
//       >
//         <AntDesign name="arrowleft" size={17} color="white" />
//       </TouchableOpacity>

//       <Animated.Image
//         style={[
//           {
//             height: animatedHeaderHeight,
//           },
//         ]}
//         source={{ uri: data?.image }}
//         className="h-[460px]  shadow-2xl shadow-slate-500"
//         resizeMode="cover"
//       />
//     </View>
//   );
// };

// export default DynamicHeader;
