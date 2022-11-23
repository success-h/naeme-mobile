import { View, Image, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { BlurView } from 'expo-blur';
import { MyText } from './AppText';
import { EventDataTypes } from '../types/typings';
import { useNavigation } from '@react-navigation/native';
import { NavigationPrp } from './TicketCard';

export default function MyEvent(props: EventDataTypes) {
  const month = moment(props.date).format('MMM');
  const day = moment(props.date).format('DD');
  const navigation = useNavigation<NavigationPrp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { ...props })}
      className="bg-white h-[240px]  shadow-2xl mx-4 items-center p-4 rounded-3xl my-6"
    >
      <View className="items-center absolute right-7 top-7 p-2 ml-4 h-[69px] shadow-lg bg-gray-100 z-30 bottom-3 rounded-xl">
        <MyText style="text-[30px] font-bold text-rose-500">{month}</MyText>
        <MyText style="text-[13px] -mt-1 leading-4">{day}</MyText>
      </View>

      <View className="mt-3 w-full justify-between">
        <View className="mt-2">
          <MyText style="text-3xl font-bold">{props.title}</MyText>
          <MyText style="">selling {props.total_ticket_count} tickets</MyText>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="mt-10">
            <MyText style="text-sm font-bold">tickets sold</MyText>
            <MyText textStyle="open-sans-bold" style="text-sm">
              {props.total_sold_tickets ? props.total_sold_tickets : 0} Sold
            </MyText>
          </View>
          <View className="mt-10">
            <MyText style="text-sm font-bold">tickets available</MyText>
            <MyText textStyle="open-sans-bold" style="text-sm">
              {props.total_ticket_count - props.total_sold_tickets} Available
            </MyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
