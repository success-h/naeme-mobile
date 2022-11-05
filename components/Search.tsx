import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';

import { AntDesign, Feather } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { useEventContext } from '../hooks/useEvent';

export default function Search() {
  const {
    setLoading,
    setEventData,
    fetchData,
    textState,
    setSearching,
    setTextState,
  } = useEventContext();

  const {
    control,
    resetField,
    formState: { errors, isDirty, dirtyFields },
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
    <View className="-mt-3 mx-4">
      <Text
        style={{ fontFamily: 'open-sans-bold' }}
        className="text-gray-200 font-bold text-lg mt-2"
      >
        Discover Amazing Events
      </Text>
      <View className="mt-1 rounded-3xl my-2 justify-between flex-row items-center shadow-2xl bg-gray-600 px-2">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="text-gray-300  h-10 flex-1 bg-opacity-25"
              onChangeText={(text) => {
                onChange(text);
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
        <TouchableOpacity className="bg-gry-300 p-1 rounded-full">
          {isDirty ? (
            <AntDesign
              onPress={() => {
                resetField('search');
                setSearching(false);
                // fetchData();
              }}
              name="closecircleo"
              size={24}
              color="#000"
            />
          ) : (
            <Feather name="search" size={24} color="#eee" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
