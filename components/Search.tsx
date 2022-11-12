import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';

import { AntDesign, Feather } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { useEventContext } from '../hooks/useEvent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../hooks/useAuth';
import { RootTabParamList } from '../types/types';
import { MyText } from './AppText';

type NavProps = NavigationProp<RootTabParamList, 'Home'>;

export default function Search() {
  const { setLoading, setEventData, textState, setTextState, setSearching } =
    useEventContext();
  const navigation = useNavigation<NavProps>();
  const { user } = useAuthContext();

  const {
    control,
    resetField,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      search: '',
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
    <View className="-mt-2">
      <View className="flex-row mb-1 justify-between items-center">
        <MyText textStyle="open-sans-bold" style="text-white text-xl">
          Discover Amazing Events
        </MyText>
        <View className="ml-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('User')}
            className="w-[45px] h-[45px] text-[#fd6e6e] "
          >
            <Image
              source={{ uri: user.image }}
              className="w-full h-full rounded-full border-[#ffffff] border"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="rounded-3xl my-2 justify-between flex-row items-center shadow-2xl bg-gray-600 px-2">
        <TouchableOpacity className="bg-gry-300 p-1 rounded-full">
          {dirtyFields.search ? (
            <AntDesign
              onPress={() => {
                resetField('search');
                setSearching(false);
                // fetchData();
              }}
              name="closecircleo"
              size={24}
              color="#fff"
            />
          ) : (
            <Feather name="search" size={24} color="#eee" />
          )}
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="text-gray-300 px-2 h-10 flex-1 bg-opacity-25"
              onChangeText={(text) => {
                onChange(text);
                setTextState(text);
              }}
              value={value}
              onBlur={onBlur}
              onSubmitEditing={(e) => {
                setSearching(true);
                searchFunction(e.nativeEvent.text);
              }}
              defaultValue={textState}
              placeholder="Search events by name"
              underlineColorAndroid="transparent"
              placeholderTextColor={'#191d26'}
            />
          )}
          name="search"
        />
      </View>
    </View>
  );
}
