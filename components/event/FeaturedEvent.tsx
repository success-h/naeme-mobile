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
import { useEventContext } from '../../Providers/EventProvider';
import { EvilIcons } from '@expo/vector-icons';

export type NavigationProps = NativeStackNavigationProp<
  HomeRootStackParamList,
  'Detail'
>;

export default function FeaturedEventCard({ data }: { data: EventProps }) {
  const navigation = useNavigation<NavigationProps>();
  const date = moment(data.start_date).format('MMMM D, YYYY');
  const { location } = useEventContext();

  return (
    <TouchableOpacity
      touchSoundDisabled={true}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('Detail', { data })}
      className="bg-white my-2 mx-3 rounded-2xl shadow-md shadow-gray-200 w-[240px] h-[230px]"
    >
      <View className="mx-2 mt-2">
        <Image
          resizeMode="cover"
          className="w-full h-[150px] rounded-2xl"
          source={{ uri: data.image }}
        />

        {!data.lowest_price && !data.highest_price && (
          <Text className="left-3 top-3 text-xs absolute bg-gray-50 px-2 rounded-xl">
            $0.00
          </Text>
        )}
        {data.lowest_price === data.highest_price ? (
          <Text className="left-3 top-3 text-xs absolute bg-gray-50 px-1 rounded-xl">
            ${data.lowest_price}
          </Text>
        ) : (
          <Text className="left-3 top-3 text-xs absolute bg-gray-50 px-1 rounded-xl">
            ${data.lowest_price} - ${data.highest_price}
          </Text>
        )}
      </View>
      <View className="w-full px-2 mt-2">
        <View className="flex-row px-1 justify-between">
          <Text className="font-bold text-[16px] ">{data.title}</Text>
        </View>
        <View className="flex-row items-center mt-2 justify-between">
          <View className="px-1">
            <Text className="text-[13px]">{date}</Text>
          </View>
          <View className="flex-row mt-1">
            <EvilIcons name="location" size={18} color="#898989" />
            <Text className="text-[13px]">{data.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
