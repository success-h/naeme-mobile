import {
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Text,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Entypo, AntDesign, Octicons, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { Countdown } from '../Utils/CountDown';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigationProps } from './EventCard';
import { EventDataTypes } from '../types/typings';
import { MyText } from './AppText';

export default function Details(props: EventDataTypes) {
  const navigation = useNavigation<useNavigationProps>();

  const dt = moment(props.date + ' ' + props?.end_time, 'DD/MM/YYYY HH:mm');
  const targetTime = moment(dt);
  const [currentTime, setCurrentTime] = useState(moment());
  const time = moment(props.start_time, 'HH:mm').format('h:mm A');
  const date = moment(props.date).format('MMMM D, YYYY');
  const opacity = useRef(new Animated.Value(0)).current;

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }
  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    fadeIn();
    return () => {
      fadeOut();
      console.log('fadeout-------------');
    };
  }, []);

  // description read more
  const [readMore, setReadMore] = useState(false);
  const [text, setText] = useState<string | null>(
    props?.description.slice(0, 200)
  );

  console.log();
  const Lng: number = -118.192395;
  const Lat: number = 33.769327;
  return (
    <View className="rounded-[30px] flex-1 px-4 pb-20">
      <View className="">
        <Animated.View
          style={[{ opacity }]}
          className="flex-row justify-between mt-4"
        >
          <MyText
            style="mt-4 text-2xl my-3 font-bold text-[#000000]"
            textStyle="open-sans-bold"
          >
            {props.title}
          </MyText>
          <View className="flex-row items-center justify-between">
            {!props.lowest_price && !props.highest_price ? (
              <MyText style="text-lg text-[#f94c57] font-bold">$0.00</MyText>
            ) : props?.lowest_price === props?.highest_price ? (
              <View>
                <MyText style="text-xs font-bold text-[#f94c57]">
                  ${props.lowest_price}
                </MyText>
              </View>
            ) : (
              <View>
                <MyText style="text-xs font-bold text-[#f94c57]">
                  ${props.lowest_price} - {props.highest_price}
                </MyText>
              </View>
            )}
          </View>
        </Animated.View>
        <Animated.View
          style={[{ opacity }]}
          className="my-1 flex-row items-center justify-between"
        >
          <View className="flex-row justify-between p-2 items-center mr-3 bg-gray-100 border border-gray-300 w-[100%] rounded-3xl">
            <Entypo name="time-slot" size={24} color="#282828" />
            <Countdown date={props.date} end_time={props.end_time} />
          </View>
        </Animated.View>
      </View>
      <Animated.View
        style={[{ opacity }]}
        className="flex-row items-center mt-5 gap-x-2"
      >
        <View className="p-2 items-center mr-3 justify-center h-8 w-8 rounded-full bg-gray-200">
          <Ionicons name="md-calendar" size={16} color="#f94c57" />
        </View>
        <MyText
          style="text-gray-600 leading-5 text-xs"
          textStyle="open-sans-bold"
        >
          {date}
        </MyText>
      </Animated.View>
      <Animated.View
        style={[{ opacity }]}
        className="flex-row items-center mt-3 gap-x-2"
      >
        <View className="p-2 items-center mr-3 justify-center h-8 w-8 rounded-full bg-gray-200">
          <AntDesign name="clockcircle" size={16} color="#f94c57" />
        </View>
        <MyText
          style="text-gray-600 leading-5 text-xs"
          textStyle="open-sans-bold"
        >
          {time}
        </MyText>
      </Animated.View>
      <Animated.View
        style={[{ opacity }]}
        className="flex-row items-center mt-3 gap-x-2"
      >
        <View className="p-2 items-center mr-3 justify-center h-8 w-8 rounded-full bg-gray-200">
          <Octicons name="location" size={16} color="#f94c57" />
        </View>
        <MyText
          style="text-gray-600 leading-5 text-xs"
          textStyle="open-sans-bold"
        >
          {props.location}
        </MyText>
      </Animated.View>
      {props.website && (
        <Animated.View style={[{ opacity }]}>
          <TouchableOpacity
            onPress={() => Linking.openURL(props.website)}
            className="p-2 items-center justify-center h-8 mt-3 w-8 rounded-full bg-gray-200"
          >
            <AntDesign name="link" size={16} color="#f94c57" />
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View style={[{ opacity }]} className="mt-6">
        <MyText style="text-black leading-5 text-lg" textStyle="open-sans-bold">
          Description:
        </MyText>
        <MyText style="text-gray-600 leading-5" textStyle="open-sans-medium">
          {/* 
// @ts-ignore */}
          {text} {text?.length > 100 && !readMore && '...'}
          <Text
            onPress={() => {
              if (!readMore) {
                setText(props.description);
                setReadMore(true);
              } else {
                setText(props.description.slice(0, 100));
                setReadMore(false);
              }
            }}
            className="font-bold text-gray-300"
          >
            {/* 
// @ts-ignore */}
            {text?.length >= 100 && (
              <MyText textStyle="open-sans-bold" style="text-gray-900">
                {readMore ? 'Show Less' : 'Read More'}
              </MyText>
            )}
          </Text>
        </MyText>
      </Animated.View>
    </View>
  );
}

// <View className="rounded-2xl">
//   <MapView
//     initialRegion={{
//       latitude: Lat,
//       longitude: Lng,
//       latitudeDelta: 0.005,
//       longitudeDelta: 0.005,
//     }}
//     className="h-[377px] mt-7"
//   />
// </View>
