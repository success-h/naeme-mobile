import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { EventDataTypes } from '../typings';
import moment from 'moment';
import { BlurView } from 'expo-blur';

export default function MyTicket({
  image,
  start_date,
  start_time,
  title,
  description,
  location,
  organizer,
}: EventDataTypes) {
  const month = moment(start_date).format('MMM');
  const day = moment(start_date).format('DD');
  return (
    <View className="bg-white shadow-lg h-[470px] w-[330px] mx-4 rounded-3xl my-6">
      <Image source={{ uri: image }} className="h-full w-full rounded-3xl" />
      <View className="items-center h-14 absolute top-4 p-2 ml-4 shadow-lg bg-white z-30 bottom-3 rounded-xl w-14">
        <Text className="text-[20px] font-bold text-rose-500">{month}</Text>
        <Text className="text-[13px] -mt-1 leading-4">{day}</Text>
      </View>

      <BlurView
        intensity={10}
        className="bg-slate-100 p-4 rounded-3xl right-4 left-4 bottom-4 absolute w-[300px] h-[190px]"
      >
        <View className="mt-2">
          <Text className="text-xl font-bold">{title}</Text>
          <Text className="text-xs text-fray-600">
            {description.slice(0, 120)}...
          </Text>
          <Text className="font-semibold mt-3">by {organizer}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text>{location}</Text>
          <TouchableOpacity className="bg-gray-900 shadow-lg px-4 py-2 rounded-xl mt-3 ">
            <Text className="text-gray-100 font-semibold">View Analyst</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}
