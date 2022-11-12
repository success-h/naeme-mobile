import { View, Image, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { BlurView } from 'expo-blur';
import { MyText } from './AppText';
import { EventDataTypes } from '../types/typings';

export default function MyEvent({
  image,
  date,
  title,
  description,
  location,
  organizer,
}: EventDataTypes) {
  const month = moment(date).format('MMM');
  const day = moment(date).format('DD');

  return (
    <View className="bg-white  shadow-2xl mx-4 items-center p-4 rounded-3xl my-6">
      <View className="items-center h-14 absolute right-7 top-7 p-2 ml-4 shadow-lg bg-white z-30 bottom-3 rounded-xl w-14">
        <MyText style="text-[20px] font-bold text-rose-500">{month}</MyText>
        <MyText style="text-[13px] -mt-1 leading-4">{day}</MyText>
      </View>
      <Image source={{ uri: image }} className="h-[240px] w-full rounded-3xl" />

      <View className="mt-3 w-full flex-row justify-between">
        <View className="mt-2">
          <MyText style="text-xl font-bold">{title}</MyText>
          <MyText style="">{location}</MyText>
        </View>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="bg-gray-900 shadow-lg px-4 py-2 rounded-xl mt-3 ">
            <MyText style="text-gray-100 font-semibold text-xs">
              Event Statistics
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
