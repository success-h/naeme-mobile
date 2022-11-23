import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RootStackScreenProps } from '../types/types';
import { LinearGradient } from 'expo-linear-gradient';
import { MyText } from '../components/AppText';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { formatTime } from '../Utils/formatter';
import { Countdown } from '../Utils/CountDown';
import axios from 'axios';
import { serverUrl } from '@env';
import { EventDataTypes } from '../types/typings';
import { StatusBar } from 'expo-status-bar';

export default function MyTicketDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'MyTicketDetail'>) {
  const [ticketEvent, setTicketEvent] = useState({} as EventDataTypes);

  const data = route?.params;

  const fetchTickets = async () => {
    const response = await axios.get(
      `${serverUrl}/events/${route.params.event}`
    );
    const data = await response.data;
    if (data) {
      setTicketEvent(data);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar animated style="dark" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={` ${
          Platform.OS === 'ios' ? 'top-20' : 'top-20'
        } bg-[#ffffff] z-30 absolute rounded-full left-5 items-center p-2`}
      >
        <AntDesign name="arrowleft" size={20} color="#181818" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          fetchTickets();
        }}
      >
        <LinearGradient
          colors={['#eee', '#fff', '#eee']}
          end={{ x: 0.3, y: 0.2 }}
          className="h-[550px] w-[315px] border border-gray-300 mx-4 rounded-3xl"
        >
          <View className="h-full w-full py-7 px-4">
            <MyText
              textStyle="open-sans-bold"
              style="text-white text-gray-800 text-3xl"
            >
              {data.event_name}
            </MyText>
            <View className="flex-row ml-2 mt-3 items-center">
              <View className="flex-row items-center shadow-xl rounded-lg shadow-gray-400 px-3 gap-1 pb-1 bg-[#f23f55]">
                <FontAwesome name="ticket" size={17} color="#e8e1e2" />
                <Text
                  style={{ fontFamily: 'open-sans-semi' }}
                  className="text-[#e8e1e2] text-sm"
                >
                  {route.params.title}
                </Text>
              </View>
            </View>
            <View className="border-b border-gray-200 my-4" />
            <Image
              source={{ uri: data.qr_code }}
              className="h-[170px] w-[170px] mx-auto shadow-lg"
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
                      {data.date}
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
                      {formatTime(data.start_time)}
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
                      {data.quantity}
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
                      {data.price * data.quantity}
                    </MyText>
                  </View>
                </View>
              </View>
              <View className="border-b border-gray-200 my-4" />
              <View className="flex-row items-center justify-between">
                <Entypo name="time-slot" size={24} color="#282828" />
                <Countdown date={data.date} end_time={data.end_time} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
