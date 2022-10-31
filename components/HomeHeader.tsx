import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';
import { useAuthContext } from '../Providers/AuthProvider';
import { BlurView } from 'expo-blur';
import { EvilIcons } from '@expo/vector-icons';

import { AntDesign, Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList } from '../types';
import { useEventContext } from '../Providers/EventProvider';
import { Controller, useForm } from 'react-hook-form';

type NavProps = NavigationProp<HomeRootStackParamList, 'User'>;

export default function HomeHeader() {
  const {
    setLoading,
    setEventData,
    fetchData,
    textState,
    setSearching,
    setTextState,
    location,
  } = useEventContext();
  const { user } = useAuthContext();

  const navigation = useNavigation<NavProps>();

  const {
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      search: undefined,
    },
  });

  const searchData = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://naeme-api.herokuapp.com/api/events/?title=${text}`
      );
      const data = await response.json();
      setLoading(false);
      return data?.results;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const searchFunction = useCallback(async (text: string) => {
    if (text) {
      const data = await searchData(text);
      if (data) {
        setEventData(data);
      }
    }
  }, []);

  return (
    <BlurView tint="light" intensity={Platform.OS === 'ios' ? 40 : 0}>
      <View
        className={`${
          Platform.OS === 'ios' ? 'pt-14' : 'pt-10 bg-white'
        } pb-2 px-4 top-0 fixed shadow-2xl mt-2`}
      >
        <View className="flex-row justify-between items-start mb-2">
          <View>
            <Text className="text-md font-semibold mb-1 text-s text-gray-800">
              {user?.username}
            </Text>
            <View className="flex-row items-center mb-3">
              <EvilIcons name="location" size={18} color="#898989" />
              {location.city && (
                <Text className="ml-2 text-[#898989]">
                  {location.city}, {location.country}
                </Text>
              )}
            </View>
          </View>
          <View className="gap-2">
            <TouchableOpacity
              onPress={() => navigation.navigate('User')}
              className="w-[50px] h-[50px]"
            >
              <Image
                source={{ uri: user?.image }}
                className="w-full h-full rounded-full"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BlurView>
  );
}
