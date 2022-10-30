import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { ReactElement, ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, HomeStackScreenProps } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';

export type NavigationProps = NativeStackNavigationProp<
  HomeRootStackParamList,
  'Detail'
>;

export default function EventCard({ data }: { data: EventProps }) {
  const navigation = useNavigation<NavigationProps>();
  const date = moment(data.start_date).format('MMMM D, YYYY');

  return (
    <TouchableOpacity
      touchSoundDisabled={true}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('Detail', { data })}
      className="bg-white my-5 mx-3 rounded-2xl shadow-md shadow-gray-200"
    >
      <View className="mb-3">
        <View className="w-full h-[230px] ">
          <Image
            resizeMode="cover"
            className="w-full h-full rounded-2xl"
            source={{ uri: data.image }}
          />

          <Text className="left-3 bottom-3 absolute bg-gray-50 px-1 rounded-full">
            {date}
          </Text>

          {data.sold_ticket_count === null ? (
            <View className="right-3 bottom-3 absolute bg-gray-50 px-1 rounded-full">
              <Text>0 SOLD</Text>
            </View>
          ) : (
            <View className="right-3 bottom-3 absolute bg-gray-50 px-1 rounded-full">
              <Text>{data.sold_ticket_count} SOLD</Text>
            </View>
          )}
        </View>
        <View className="w-full p-3 bg-white">
          <View className="flex-row justify-between">
            <Text className="font-bold text-lg">{data.title}</Text>
          </View>
          <Text className="mb-3 text-xs  text-gray-700">
            {data?.description.slice(0, 100)}..{' '}
            <Text className="font-bold">see more</Text>
          </Text>
          <View className="w-full">
            {!data.lowest_price && !data.highest_price && (
              <Text className="left-4 bottom-3 absolute bg-gray-200 px-1 rounded-full">
                $0.00
              </Text>
            )}

            {data.lowest_price === data.highest_price ? (
              <Text className="left-3 bottom-3 absolute bg-gray-200 px-1 rounded-full">
                ${data.lowest_price}
              </Text>
            ) : (
              <Text className="left-3 bottom-3 absolute bg-gray-200 px-1 rounded-full">
                ${data.lowest_price} - ${data.highest_price}
              </Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { data })}
              className="self-end py-3 px-5 rounded-2xl text-sm font-bold bg-black"
            >
              <Text className="text-white">Get ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
