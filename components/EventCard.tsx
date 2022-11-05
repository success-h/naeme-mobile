import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';

import React, { ReactElement, ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { EventDataTypes } from '../typings';
import { useEventContext } from '../hooks/useEvent';

export type useNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

export default function EventCard(props: EventDataTypes) {
  const navigation = useNavigation<useNavigationProps>();
  const { like, setLike, location } = useEventContext();
  const month = moment(props.start_date).format('MMM');
  const day = moment(props.start_date).format('DD');

  return (
    <Pressable
      onPress={() => navigation.navigate('Detail', { ...props })}
      className="bg-white my-7 mx-3 rounded-2xl shadow-sm shadow-gray-200"
    >
      <View className="mb-3">
        <View className="w-full h-[250px] ">
          <Image
            resizeMode="cover"
            className="w-full h-full rounded-2xl"
            source={{ uri: props.image }}
          />
          <View className="mt-2  items-center p-2 ml-4 absolute shadow-sm shadow-gray-300 bg-white z-30 bottom-3 rounded-xl w-14">
            <Text className="text-[20px] font-bold text-rose-500">{month}</Text>
            <Text className="text-[13px] -mt-1 leading-4">{day}</Text>
          </View>

          <View className="mt-2  items-center p-2 ml-4 absolute shadow-sm shadow-gray-300 bg-white z-30 top-3 right-3 rounded-xl">
            <TouchableOpacity
              className=""
              activeOpacity={0.2}
              onPress={() => setLike(!like)}
            >
              {like ? (
                <Ionicons name="heart" size={27} color="red" />
              ) : (
                <Ionicons name="heart-outline" size={27} color="red" />
              )}
            </TouchableOpacity>
          </View>

          {props.sold_ticket_count === null ? (
            <View className="right-3 bottom-3 absolute bg-gray-50 px-1 rounded-full">
              <Text>0 SOLD</Text>
            </View>
          ) : (
            <View className="right-3 bottom-3 absolute bg-gray-50 px-1 rounded-full">
              <Text>{props.sold_ticket_count} SOLD</Text>
            </View>
          )}
        </View>
        <View className="w-full p-4 bg-white">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl">{props.title}</Text>
          </View>

          <View className="w-full">
            {props.lowest_price ? (
              <Text className="left-3 bottom-3 absolute bg-gray-200 px-1 rounded-full">
                ${props.lowest_price}
              </Text>
            ) : (
              <Text className="bottom-3 absolute rounded-full">$0.00</Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { ...props })}
              className="self-end py-3 px-5 rounded-2xl text-sm font-bold bg-black"
            >
              <Text className="text-white">Get ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
