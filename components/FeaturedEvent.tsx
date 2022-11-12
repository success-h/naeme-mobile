import {
  View,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuth';
import { useEventContext } from '../hooks/useEvent';
import { RootStackParamList } from '../types/types';
import { EventDataTypes } from '../types/typings';
import { MyText } from './AppText';

export type useNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

import { serverUrl } from '@env';

export default function FeaturedEvent() {
  const navigation = useNavigation<useNavigationProps>();
  const { user } = useAuthContext();
  const [like, setLike] = useState(false);
  const { fetchData } = useEventContext();
  const [featuredEvent, setFeaturedEvent] = useState<EventDataTypes[]>([]);

  const Url = `${serverUrl}/events/?featured=true`;

  useLayoutEffect(() => {
    (async () => {
      const EventData: EventDataTypes[] = await fetchData(Url);
      setFeaturedEvent(EventData);
    })();
  }, []);

  return (
    <View>
      <View className="flex-row justify-between items-center my-3">
        <MyText textStyle="open-sans-bold" style="px-4 text-white">
          Popular Events🔥
        </MyText>
        <TouchableOpacity
          className="bg-slate-700 px-2 py-1 mr-4 rounded-xl"
          onPress={() => navigation.navigate('CreateEvent', { ...user })}
        >
          <MyText textStyle="open-sans-bold" style="text-white">
            Create Event
          </MyText>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 20 }}
        className=""
      >
        {featuredEvent?.map((data: EventDataTypes) => {
          const month = moment(data.date).format('MMM');
          const day = moment(data.date).format('DD');
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={data.id}
              onPress={() => navigation.navigate('Detail', { ...data })}
              className=" mx-3 rounded-3xl bg-white w-[270px] h-[254px]"
            >
              <View className="shadow-md">
                <Image
                  resizeMode="cover"
                  className="rounded-t-3xl h-[132px]"
                  source={{ uri: data?.image }}
                />
              </View>

              <View className="w-full px-4 py-5 flex-1 rounded-b-3xl">
                <View className="mt-2  items-center p-2 ml-4 absolute shadow-md shadow-gray-300 bg-white z-30 -top-10 rounded-xl w-14">
                  <MyText style="text-[20px] font-bold text-rose-500">
                    {month}
                  </MyText>
                  <MyText style="text-[13px] -mt-1 leading-4">{day}</MyText>
                </View>
                <MyText textStyle="open-sans-bold" style="mt-3 text-[18px]">
                  {data.title}
                </MyText>
                <View className="flex-row mt-1 items-center mr-2">
                  <MyText style="text-[13px] font-medium text-gray-400">
                    by {data.organizer}
                  </MyText>
                </View>
                <View className="flex-row items-center justify-between">
                  {data.lowest_price ? (
                    <MyText style="text-gray-500 font-semibold">
                      ${data.lowest_price}
                    </MyText>
                  ) : (
                    <MyText style="text-gray-500 font-semibold">$0.00</MyText>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={() => {
                      setLike(!like);
                    }}
                  >
                    {data.liked === true ? (
                      <Ionicons name="heart" size={27} color="red" />
                    ) : (
                      <Ionicons name="heart-outline" size={27} color="red" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
