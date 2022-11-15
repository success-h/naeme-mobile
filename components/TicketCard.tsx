import { serverUrl } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLayoutEffect, useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types/types';
import { EventDataTypes, TicketDataTypes } from '../types/typings';
import { MyText } from './AppText';
import { formatTime } from '../Utils/formatter';
import { Countdown } from '../Utils/CountDown';
import { Entypo } from '@expo/vector-icons';

type NavigationPrp = NavigationProp<RootStackParamList, 'Detail'>;

export default function TicketCard(props: TicketDataTypes) {
  const [ticketEvent, setTicketEvent] = useState({} as EventDataTypes);

  const fetchTickets = async () => {
    if (props.event) {
      const response = await axios.get(`${serverUrl}/events/${props.event}`);
      const data = await response.data;
      if (data) {
        setTicketEvent(data);
      }
    }
  };

  useLayoutEffect(() => {
    fetchTickets();
  }, []);

  const navigation = useNavigation<NavigationPrp>();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Detail', { ...ticketEvent })}
    >
      <LinearGradient
        colors={['#eee', '#fff', '#eee']}
        end={{ x: 0.3, y: 0.2 }}
        className="h-[500px] mt-20 w-[315px] mx-4 rounded-3xl"
      >
        <View className="h-full w-full py-7 px-4">
          <MyText
            textStyle="open-sans-bold"
            style="text-white text-gray-800 text-3xl"
          >
            {props.event_name}
          </MyText>
          <View className="flex-row ml-2 mt-3 items-center">
            <View className="flex-row items-center shadow-xl rounded-lg shadow-gray-400 px-3 gap-1 pb-1 bg-[#f23f55]">
              <FontAwesome name="ticket" size={17} color="#e8e1e2" />
              <Text
                style={{ fontFamily: 'open-sans-semi' }}
                className="text-[#e8e1e2] text-sm"
              >
                {props.title}
              </Text>
            </View>
          </View>
          <View className="border-b border-gray-200 my-4" />
          <Image
            source={{ uri: props.qr_code }}
            className="h-[130px] w-[130px] mx-auto shadow-lg"
          />
          <View className="border-b border-gray-200 my-4" />
          <View className="bg-white shadow-lg rounded-lg px-2 py-2">
            <View className="flex-row justify-between">
              <View className="gap-5">
                <View>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-rose-500 text-xs"
                  >
                    Date
                  </MyText>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-[#000000] text-lg"
                  >
                    {props.date}
                  </MyText>
                </View>
                <View>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-rose-500 text-xs"
                  >
                    Time
                  </MyText>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-[#000000] text-lg"
                  >
                    {formatTime(props.start_time)}
                  </MyText>
                </View>
              </View>
              <View className="gap-5">
                <View>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-rose-500 text-xs"
                  >
                    Quantity
                  </MyText>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-[#000000] text-lg"
                  >
                    {props.quantity}
                  </MyText>
                </View>
                <View>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-rose-500 text-xs"
                  >
                    Price Each
                  </MyText>
                  <MyText
                    textStyle="open-sans-bold"
                    style="text-[#000000] text-lg"
                  >
                    {props.price * props.quantity}
                  </MyText>
                </View>
              </View>
            </View>
            <View className="border-b border-gray-200 my-4" />
            <View className="flex-row items-center justify-between">
              <Entypo name="time-slot" size={24} color="#282828" />
              <Countdown date={props.date} end_time={props.end_time} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
