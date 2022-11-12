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
} from 'react-native';
import React, { useState } from 'react';
import { RootStackScreenProps } from '../types/types';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MyText } from '../components/AppText';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

type ImageProp = {
  assetId: string;
  uri: string;
};

import { GOOGLE_API_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function CreateEventScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateEvent'>) {
  const [image, setImage] = useState<ImagePicker.ImageInfo | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      participants: '',
      image: {},
      location: '',
      date: '',
      start_time: '',
      end_time: '',
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
    }
  };
  return (
    <LinearGradient
      end={{ x: 0.1, y: 0.1 }}
      colors={['#ffffff', '#fefffe']}
      className="bg-white flex-1 px-4"
    >
      <StatusBar animated={true} style="dark" />
      <SafeAreaView className={Platform.OS === 'ios' ? 'mt-16' : 'mt-12'}>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            className="p-2 bg-gray-100 rounded-3xl"
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={22} color="#181818" />
          </TouchableOpacity>

          <MyText textStyle="open-sans-semi" style="text-xl text-gray-900">
            Schedule Event
          </MyText>
          <View />
        </View>
      </SafeAreaView>
      <View className="mt-7">
        <View className="my-2">
          <MyText style="text-md text-gray-700" textStyle="open-sans-bold">
            Title
          </MyText>

          <View className="bg-slate-100 rounded-lg mt-4">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 px-3"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="location"
                  placeholder="Event title"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="title"
            />
            {errors.title && <Text>This is required.</Text>}
          </View>
        </View>
        <View className="my-2">
          <MyText style="text-md text-gray-700" textStyle="open-sans-bold">
            Locaion
          </MyText>
          <GooglePlacesAutocomplete
            nearbyPlacesAPI="GooglePlacesSearch"
            placeholder="Enter event location"
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 14,
                // paddingVertical: 20,
                marginTop: 13,
                height: 30,
                // color: '#ddd',
              },
            }}
            debounce={400}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
            }}
          />
          {/* <View className="bg-slate-100 rounded-lg mt-4">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 px-3"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="location"
                  placeholder="Your venue"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="location"
            />
            {errors.title && <Text>This is required.</Text>}
          </View> */}
        </View>
        <View className="my-2">
          <MyText style="text-md text-gray-700" textStyle="open-sans-bold">
            Participants
          </MyText>
          <MyText textStyle="open-sans-semi" style="text-gray-600 text-xs mt-2">
            Choose how many people can attend this event.
          </MyText>
          <View className="bg-slate-100 rounded-lg mt-1">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 px-3"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  textContentType="location"
                  placeholder="Participants"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="participants"
            />
            {errors.title && <Text>This is required.</Text>}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

{
  /* <Button title="Pick an image from camera roll" onPress={pickImage} />
{image && (
  <Image
    source={{ uri: image.uri }}
    style={{ width: 200, height: 200 }}
  />
)} */
}
