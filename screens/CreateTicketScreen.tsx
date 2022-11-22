import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { RootStackParamList, RootStackScreenProps } from '../types/types';
import { useTabNavigationProps } from '../navigation/TabNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MyText } from '../components/AppText';
import { Controller, useForm } from 'react-hook-form';
import { fadeIn } from './CreateEventScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokensType } from '../hooks/useCachedResources';
import { useAuthContext } from '../hooks/useAuth';
import { serverUrl } from '@env';
import {
  EventDataTypes,
  ResponseType,
  TicketDataTypes,
} from '../types/typings';
import { CommonActions, StackActions } from '@react-navigation/native';

export default function CreateTicketScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateTicket'>) {
  const [loading, setLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [eventId, setEventId] = useState('');
  const { user } = useAuthContext();

  async function getEventId() {
    const eventId = await AsyncStorage.getItem('eventId');
    const id = eventId != null ? JSON.parse(eventId) : null;
    setEventId(id);
  }
  console.log(eventId);
  interface SubmitData {
    title: string;
    quantity: string;
    price: string;
  }

  async function handleDone() {
    setExitLoading(true);
    console.log('............close-----');
    setTimeout(() => {
      setExitLoading(false);
    }, 3000);

    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/events/${eventId}`);
      const eventData: EventDataTypes = await response.json();
      if (response.status === 200) {
        console.log(eventData);
        await AsyncStorage.removeItem('eventId');
        navigation.popToTop();
        navigation.navigate('Detail', { ...eventData });
        setLoading(false);
      }
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return e;
    }
  }

  const onSubmit = async (data: SubmitData) => {
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;

    const formData = new FormData();
    formData.append('price', Number(data.price));
    formData.append('title', data.title);
    formData.append('quantity', Number(data.quantity));
    formData.append('event', eventId);
    formData.append('owner', user.id);

    const url = `${serverUrl}/tickets/`;
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${tokens?.access}`,
      },
      body: formData,
    };

    try {
      setLoading(true);
      const response = await fetch(url, requestOptions);
      const data: TicketDataTypes = await response.json();
      if (response.status === 201) {
        setLoading(false);
        reset();
      }
      console.log({ data });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  useEffect(() => {
    fadeIn(opacity);
    getEventId();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: '',
      title: '',
      quantity: '',
    },
  });
  return (
    <ScrollView className="">
      <View className="flex-1 pb-32 px-4 bg-white h-screen">
        <StatusBar animated={true} style="dark" />
        <SafeAreaView className={Platform.OS === 'ios' ? 'mt-10' : 'mt-12'}>
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              className="p-2 bg-white rounded-3xl"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={22} color="#181818" />
            </TouchableOpacity>

            <MyText textStyle="open-sans-bold" style="text-xl">
              Create Ticket
            </MyText>
            <TouchableOpacity onPress={handleDone}>
              {exitLoading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <MyText textStyle="open-sans-bold" style="text-sm">
                  Done
                </MyText>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View className="mt-20">
          <MyText textStyle="open-sans-bold" style="mb-2 text-sm">
            Ticket Name
          </MyText>
          <Animated.View
            style={[{ opacity }]}
            className="bg-gray-100 rounded-lg px-3"
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className=" text-gray-500 py-4"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ticket name"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="title"
            />
          </Animated.View>
          {errors.title && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}
          <MyText textStyle="open-sans-bold" style="my-1 mt-2 text-sm">
            Price
          </MyText>
          <Animated.View
            style={[{ opacity }]}
            className="bg-gray-100 rounded-lg my-2 px-3"
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="text-gray-500 py-4"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="telephoneNumber"
                  keyboardType="numeric"
                  placeholder="Price of tickets"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="price"
            />
          </Animated.View>
          {errors.price && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}
          <MyText textStyle="open-sans-bold" style="my-1 text-sm">
            Quantity
          </MyText>
          <Animated.View
            style={[{ opacity }]}
            className="bg-gray-100 px-3 rounded-lg my-2"
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="text-gray-500 py-5"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="decimal-pad"
                  placeholder="Quantity of tickets"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="quantity"
            />
          </Animated.View>
          {errors.quantity && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-[#000] rounded-xl mt-10"
          >
            {loading ? (
              <ActivityIndicator size={'small'} className="p-3 px-20" />
            ) : (
              <MyText
                style="px-14 py-4 text-center text-rose-300"
                textStyle="open-sans-bold"
              >
                Create Ticket
              </MyText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
