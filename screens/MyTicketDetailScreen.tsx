import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RootStackScreenProps } from '../types/types';
import { LinearGradient } from 'expo-linear-gradient';
import { MyText } from '../components/AppText';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { formatCurrency, formatTime } from '../Utils/formatter';
import { Countdown } from '../Utils/CountDown';
import axios from 'axios';
import { serverUrl } from '@env';
import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { TokensType } from '../hooks/useCachedResources';

export default function MyTicketDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'MyTicketDetail'>) {
  const data = route?.params;
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(data.used);
  const { user } = useAuthContext();

  const verifyTicket = async () => {
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;

    const formData = new FormData();
    formData.append('used', true);
    setLoading(true);
    if (tokens.access && data?.id) {
      if (user?.id === data.ticket_admin) {
        axios
          .patch(
            `${serverUrl}/my-tickets/${data?.id}/`,
            { used: true },
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${tokens?.access}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setIsVerified(response.data.used);
              setLoading(false);
            }
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      }
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
      <ScrollView className="bordermx-4 rounded-3xl w-full px-[7%]">
        <View className="h-full w-full py-7 mt-[50%] px-4">
          <MyText
            textStyle="open-sans-bold"
            style="text-white text-gray-800 text-3xl"
          >
            {data.event_name}
          </MyText>
          <View className="flex-row ml-2 mt-3 items-center">
            <View className="flex-row items-center shadow-xl rounded-lg px-3 gap-1 pb-1 bg-[#f23f55]">
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
          <View className="h-[220px] w-[220px] mx-auto shadow-lg mt-4">
            <Image
              source={{ uri: data.qr_code }}
              resizeMode="cover"
              className="h-full w-full"
            />

            {isVerified && (
              <View className="w-[220px] h-[220px] items-center justify-center absolute">
                <MaterialIcons name="verified" size={180} color="#009154" />
              </View>
            )}
          </View>
          <View className="border-b border-gray-200 my-4" />
          <View className=" shadow-lg rounded-lg px-2 py-2">
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
                    $ {formatCurrency(data.price * data.quantity)}
                  </MyText>
                </View>
              </View>
            </View>
            <View className="border-b border-gray-200 my-4" />
            <View className="flex-row items-center justify-between">
              <View className="mr-3">
                <Entypo name="time-slot" size={24} color="#282828" />
              </View>
              <Countdown date={data.date} end_time={data.end_time} />
            </View>
          </View>
          {user?.id === data.ticket_admin && (
            <TouchableOpacity
              onPress={verifyTicket}
              className="bg-rose-500 mx-2 mt-2 rounded-xl"
            >
              <MyText
                textStyle="open-sans-bold"
                style="text-center text-white py-4"
              >
                {isVerified
                  ? 'Verified'
                  : loading
                  ? 'Verifying...'
                  : ' Verify Ticket'}
              </MyText>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
