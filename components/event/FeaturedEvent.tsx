import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import React, { ReactElement, ReactNode, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, HomeStackScreenProps } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigationProps } from './EventCard';
import { formatTime } from '../../Utils/formatter';
import { useEventContext } from '../../hooks/useEvent';

export default function FeaturedEvent() {
  const navigation = useNavigation<useNavigationProps>();
  const { eventData } = useEventContext();
  const [like, setLike] = useState(false);

  return (
    <View>
      <Text className="px-4 text-white mt-5 font-bold">Popular Events🔥</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 20 }}
        className=""
      >
        {eventData.map((data) => {
          const month = moment(data.start_date).format('MMM');
          const day = moment(data.start_date).format('DD');
          return (
            <Pressable
              key={data.id}
              onPress={() => navigation.navigate('Detail', { data })}
              className=" mx-3 rounded-3xl bg-white w-[270px] h-[254px]"
            >
              <View className="shadow-md">
                <Image
                  resizeMode="cover"
                  className="rounded-t-3xl h-[147px]"
                  source={{ uri: data?.image }}
                />
              </View>

              <View className="w-full px-4 py-5 flex-1 rounded-b-3xl">
                <View className="mt-2  items-center p-2 ml-4 absolute shadow-md shadow-gray-300 bg-white z-30 -top-10 rounded-xl w-14">
                  <Text className="text-[20px] font-bold text-rose-500">
                    {month}
                  </Text>
                  <Text className="text-[13px] -mt-1 leading-4">{day}</Text>
                </View>
                <Text className="font-bold mt-3 text-[18px]">{data.title}</Text>
                <View className="flex-row mt-1 items-center mr-2">
                  <Text className="text-[13px] font-medium text-gray-400">
                    by {data.organizer}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  {data.lowest_price ? (
                    <Text className="text-gray-500 font-semibold">
                      ${data.lowest_price}
                    </Text>
                  ) : (
                    <Text className="text-gray-500 font-semibold">$0.00</Text>
                  )}
                  <TouchableOpacity
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
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
