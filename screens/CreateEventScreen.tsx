import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
  Pressable,
  Animated,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackScreenProps } from '../types/types';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MyText } from '../components/AppText';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../Utils/formatter';
import { useAuthContext } from '../hooks/useAuth';
import axios from 'axios';
import { serverUrl } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokensType } from '../hooks/useCachedResources';
import moment from 'moment';
import { EventDataTypes } from '../types/typings';

type ImageProp = {
  assetId: string;
  uri: string;
};

export function fadeIn(opacity: Animated.Value) {
  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
}
export default function CreateEventScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateEvent'>) {
  const [image, setImage] = useState<ImagePicker.ImageInfo | null>(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [startTime, setStartTime] = useState(new Date(15980988770000));
  const [endTime, setEndTime] = useState(new Date(15980988770000));
  const [showDate, setShowDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // states ended

  // animation functions
  function fadeImage() {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  // Effects
  useEffect(() => {
    fadeIn(opacity);
  }, []);

  // date time functions
  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    if (event.type === 'dismissed' || event.type === 'set')
      Platform.OS === 'android' && setShowDate(false);
    setDate(currentDate);
  };

  const onStartTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    if (event.type === 'dismissed' || event.type === 'set')
      Platform.OS === 'android' && setShowStartTime(false);
    setStartTime(currentDate);
  };
  const onEndTimeChange = (event: any, selectedTime: any) => {
    const currentDate = selectedTime;
    if (event.type === 'set' || event.type === 'dismissed')
      Platform.OS === 'android' && setShowEndTime(false);
    setEndTime(currentDate);
  };

  // ends

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      dirtyFields,
      isDirty,
      isSubmitted,
      isValidating,
      isValid,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      title: '',
      location: '',
      participants: '',
      description: '',
      website: '',
    },
  });

  let Uri = image?.uri;
  let fileName = Uri?.split('/').pop();

  // @ts-ignore */
  let match: RegExpExecArray | null = /\.(\w+)$/.exec(fileName);
  let type = match ? `image/${match[1]}` : `image`;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
      fadeImage();
    }
  };

  // submit function
  interface SubmitData {
    title: string;
    location: string;
    participants: string;
    description: string;
    website: string;
  }

  const onSubmit = async (data: SubmitData) => {
    const event_date = moment(date).format('YYYY-MM-DD');
    const start_time = startTime.toLocaleTimeString();
    const end_time = endTime.toLocaleTimeString();
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', {
      name: fileName,
      type: type,
      uri: Platform.OS === 'ios' ? Uri?.replace('file://', '') : Uri,
    });
    formData.append('location', data.location);
    formData.append('date', event_date);
    formData.append('start_time', start_time);
    formData.append('end_time', end_time);
    formData.append('website', data?.website);
    formData.append('owner', user?.id);
    formData.append('organizer', user?.name);

    const url = `${serverUrl}/events/`;
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
      if (image !== null) {
        const response = await fetch(url, requestOptions);
        const data: EventDataTypes = await response.json();
        if (response.status === 201) {
          const jsonValue = JSON.stringify(data.id);
          AsyncStorage.setItem('eventId', jsonValue);
          navigation.navigate('CreateTicket');
          setLoading(false);
        }
        setLoading(false);
        return data;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="">
      <Pressable
        onPress={() => {
          setShowEndTime(false);
          setShowStartTime(false);
          setShowDate(false);
        }}
        className="flex-1 pb-32 px-4 bg-white"
      >
        <StatusBar animated={true} style="dark" />
        <SafeAreaView className={Platform.OS === 'ios' ? 'mt-16' : 'mt-12'}>
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              className="p-2 bg-white rounded-3xl"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={22} color="#181818" />
            </TouchableOpacity>

            <MyText textStyle="open-sans-bold" style="text-xl">
              Schedule Event
            </MyText>
            <View />
          </View>
        </SafeAreaView>
        <View className="mt-7">
          <MyText textStyle="open-sans-bold" style="mb-2 text-sm">
            Title
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
                  placeholder="Event title"
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
            Location
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
                  textContentType="location"
                  placeholder="Your event location"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="location"
            />
          </Animated.View>
          {errors.location && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}
          <MyText textStyle="open-sans-bold" style="my-1 text-sm">
            Description
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
                  placeholder="Description"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="description"
            />
          </Animated.View>
          {errors.description && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}
          <MyText textStyle="open-sans-bold" style="my-1 text-sm">
            Link
          </MyText>
          <Animated.View
            style={[{ opacity }]}
            className="bg-gray-100 py-5 px-4 rounded-lg my-2"
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="text-gray-500"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="URL"
                  keyboardType="url"
                  placeholder="Provide link to your website or social media page"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="website"
            />
          </Animated.View>
          {errors.website && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          <MyText textStyle="open-sans-bold" style="my-1 text-sm">
            Date
          </MyText>
          <Animated.View
            style={[{ opacity }]}
            className="my-2 px-4  bg-gray-100 rounded-lg"
          >
            <Pressable onPress={() => setShowDate(!showDate)} className="">
              <View className="flex-row items-center justify-between">
                <MyText
                  textStyle="open-sans-regular"
                  style="text-sm text-xs py-5 text-gray-500"
                >
                  {formatDate(date) === 'August 22, 2020'
                    ? 'Select Date'
                    : formatDate(date)}
                </MyText>

                {showDate && Platform.OS === 'ios' && (
                  <AntDesign
                    name="close"
                    className=""
                    size={16}
                    color="#9f9e9e"
                    onPress={() => setShowDate(false)}
                  />
                )}
              </View>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  value={date}
                  mode={'date'}
                  themeVariant="light"
                  onChange={onDateChange}
                />
              )}
            </Pressable>
          </Animated.View>
          <Animated.View
            style={[{ opacity }]}
            className="my-5 flex-row gap-x-4"
          >
            <Pressable
              onPress={() => {
                setShowStartTime(true);
                setShowEndTime(false);
                setShowDate(false);
              }}
              className={`bg-gray-100 px-4 py-5 flex-1 justify-center rounded-lg ${
                showEndTime && 'h-14'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <MyText
                  textStyle="open-sans-regular"
                  style="text-sm text-xs text-gray-500"
                >
                  {formatTime(startTime) === '4:32 AM'
                    ? 'Start Time'
                    : formatTime(startTime)}
                </MyText>

                {showStartTime && Platform.OS === 'ios' && (
                  <AntDesign
                    name="close"
                    className=""
                    size={16}
                    color="#9f9e9e"
                    onPress={() => setShowStartTime(false)}
                  />
                )}
              </View>
              {showStartTime && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startTime}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  themeVariant="light"
                  mode={'time'}
                  is24Hour={false}
                  onChange={onStartTimeChange}
                />
              )}
            </Pressable>
            <Pressable
              onPress={() => {
                setShowEndTime(true);
                setShowStartTime(false);
                setShowDate(false);
              }}
              className={`bg-gray-100 px-3 py-5 flex-1 justify-center rounded-lg ${
                showStartTime && 'h-14'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <MyText
                  textStyle="open-sans-regular"
                  style="text-sm text-xs text-gray-500"
                >
                  {formatTime(endTime) === '4:32 AM'
                    ? 'End Time'
                    : formatTime(endTime)}
                </MyText>

                {showEndTime && Platform.OS === 'ios' && (
                  <AntDesign
                    name="close"
                    className=""
                    size={16}
                    color="#9f9e9e"
                    onPress={() => setShowEndTime(false)}
                  />
                )}
              </View>
              {showEndTime && (
                <DateTimePicker
                  testID="dateTimePicker"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  themeVariant="light"
                  value={endTime}
                  mode={'time'}
                  is24Hour={false}
                  onChange={onEndTimeChange}
                />
              )}
            </Pressable>
          </Animated.View>
          {/* image */}
          <Animated.View style={[{ opacity }]} className="h-[300px] mt-4">
            {image && (
              <Animated.View style={[{ opacity: imageOpacity }]}>
                <Image
                  source={{ uri: image.uri }}
                  className="h-full w-full rounded-2xl"
                  resizeMode="cover"
                  fadeDuration={2.4}
                />
                <TouchableOpacity
                  onPress={pickImage}
                  className="absolute bg-gray-400 p-2 rounded-full right-3 top-3"
                >
                  <AntDesign name="edit" size={26} color="black" />
                </TouchableOpacity>
              </Animated.View>
            )}
            {!image && (
              <TouchableOpacity
                onPress={pickImage}
                className="items-center justify-center"
              >
                <Ionicons name="image" size={54} />
                <MyText textStyle="open-sans-bold" style="text-center">
                  Upload event image
                </MyText>
                {isSubmitted && image === null && (
                  <MyText
                    textStyle="open-sans-medium"
                    style="mt-2 text-center text-rose-500 w-2/4 text-xs"
                  >
                    Note! more people respond to events with a banner; Required
                  </MyText>
                )}
              </TouchableOpacity>
            )}
            <View className="flex-row mt-12 items-center justify-center">
              <TouchableOpacity
                // onPress={() => navigation.navigate('CreateTicket')}
                onPress={handleSubmit(onSubmit)}
                className={
                  image === null
                    ? 'bg-[#c7c6c6] rounded-xl'
                    : 'bg-[#000] rounded-xl'
                }
              >
                {loading ? (
                  <ActivityIndicator size={'small'} className="p-3 px-20" />
                ) : (
                  <MyText
                    style={
                      image === null
                        ? 'px-14 py-4 text-gray-400'
                        : 'px-14 py-4 text-rose-300'
                    }
                    textStyle="open-sans-bold"
                  >
                    Create Event
                  </MyText>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </ScrollView>
  );
}
