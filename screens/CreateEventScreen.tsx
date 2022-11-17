import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackScreenProps } from '../types/types';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MyText } from '../components/AppText';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../Utils/formatter';

type ImageProp = {
  assetId: string;
  uri: string;
};

export default function CreateEventScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateEvent'>) {
  // local states starts
  const [image, setImage] = useState<ImagePicker.ImageInfo | null>(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [startTime, setStartTime] = useState(new Date(15980988770000));
  const [endTime, setEndTime] = useState(new Date(15980988770000));
  const [showDate, setShowDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  // states ended

  // animation functions
  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  function fadeImage() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  // Effects
  useEffect(() => {
    fadeIn();
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      location: '',
      participants: '',
      image: {},
      description: '',
      website: '',
      owner: '',
      organizer: '',
    },
  });

  // let localUri = image.uri;
  // let filename = localUri.split('/').pop();
  // // Infer the type of the image
  // let match = /\.(\w+)$/.exec(filename);
  // let type = match ? `image/${match[1]}` : `image`;

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

  return (
    <ScrollView
      // end={{ x: 0.1, y: 0.7 }}
      // colors={['#ddd', '#fff', '#eee']}
      className="h-screen bg-white px-4"
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
        <Animated.View
          style={[{ opacity }]}
          className="bg-white rounded-lg px-4 py-5 my-2 shadow-lg"
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className=" text-gray-500"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Event title"
                placeholderTextColor={'#9d9c9d'}
              />
            )}
            name="title"
          />
          {errors.title && <Text>This is required.</Text>}
        </Animated.View>
        <Animated.View
          style={[{ opacity }]}
          className="bg-white py-5 px-4 rounded-lg my-2  shadow-lg"
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="shadow  text-gray-500"
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
          {errors.title && <Text>This is required.</Text>}
        </Animated.View>
        <Animated.View
          style={[{ opacity }]}
          className="bg-white py-4 px-4 rounded-lg my-2  shadow-lg"
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="shadow  text-gray-500"
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={true}
                numberOfLines={4}
                value={value}
                textContentType="location"
                placeholder="Description"
                placeholderTextColor={'#9d9c9d'}
              />
            )}
            name="description"
          />
          {errors.title && <Text>This is required.</Text>}
        </Animated.View>
        <Animated.View
          style={[{ opacity }]}
          className="bg-white py-5 px-4 rounded-lg my-2  shadow-lg"
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="shadow  text-gray-500"
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
          {errors.title && <Text>This is required.</Text>}
        </Animated.View>
        <Animated.View
          style={[{ opacity }]}
          className="bg-white py-5 px-4 rounded-lg shadow-lg my-2"
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className=" text-gray-500"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                placeholder="Number of participants for this event"
                placeholderTextColor={'#9d9c9d'}
              />
            )}
            name="participants"
          />
          {errors.title && <Text>This is required.</Text>}
        </Animated.View>
        <Animated.View
          style={[{ opacity }]}
          className="my-2 px-4 py-5 bg-white rounded-lg shadow-lg"
        >
          <Pressable onPress={() => setShowDate(!showDate)} className="">
            <View className="flex-row items-center justify-between">
              <MyText
                textStyle="open-sans-regular"
                style="text-sm text-xs text-gray-500"
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
        <Animated.View style={[{ opacity }]} className="my-5 flex-row gap-x-4">
          <Pressable
            onPress={() => {
              setShowStartTime(true);
              setShowEndTime(false);
            }}
            className={`bg-white px-4 py-5 flex-1 justify-center rounded-lg  shadow-xl ${
              showEndTime && 'h-14'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <MyText
                textStyle="open-sans-regular"
                style="text-sm text-xs text-gray-500"
              >
                {formatTime(startTime) === '4:32 AM'
                  ? 'End Time'
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
            }}
            className={`bg-white px-3 py-5 flex-1 justify-center rounded-lg  shadow-xl ${
              showStartTime && 'h-14'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <MyText
                textStyle="open-sans-regular"
                style="text-sm text-xs text-gray-500"
              >
                {formatTime(endTime) === '4:32 AM'
                  ? 'Start Time'
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
            <Animated.View style={[{ opacity }]}>
              <Image
                source={{ uri: image.uri }}
                className="h-full w-full shadow-2xl rounded-2xl"
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
            <View className="items-center justify-center">
              <Ionicons name="image" size={54} />
              <MyText textStyle="open-sans-bold" style="text-center">
                Upload a Photo
              </MyText>
              <MyText
                textStyle="open-sans-medium"
                style="mt-2 text-center text-gray-500 w-2/4 text-xs"
              >
                more people respond to events with a photo
              </MyText>
              <TouchableOpacity onPress={pickImage}>
                <MyText
                  textStyle="open-sans-bold"
                  style="text-rose-500 text-center text-lg"
                >
                  Tap here to upload
                </MyText>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    </ScrollView>
  );
}
