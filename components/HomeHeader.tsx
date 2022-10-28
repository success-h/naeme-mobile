import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { ReactNode, useCallback, useState } from "react";
import { useAuthContext } from "../Providers/AuthProvider";
import { BlurView } from "expo-blur";

interface HomeHeaderTypes {
  handleSearch: (inputValue: string) => ReactNode;
}
import { AntDesign, Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeRootStackParamList } from "../types";
import { useEventContext } from "../Providers/EventProvider";
import { Controller, useForm, useFormState } from "react-hook-form";

type NavProps = NavigationProp<HomeRootStackParamList, "User">;

export default function HomeHeader() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, setLoading, setEventData, eventData } = useEventContext();

  const navigation = useNavigation<NavProps>();
  const { user } = useAuthContext();

  const searchData = async (input: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://naeme-api.herokuapp.com/api/events/?title=${input}`
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
    if (text.length > 0) {
      const data = await searchData(text);
      if (data) {
        setEventData(data);
      }
    }
  }, []);

  return (
    <BlurView intensity={Platform.OS === "ios" ? 30 : 0}>
      <View
        className={`${
          Platform.OS === "ios" ? "pt-14" : "pt-10"
        } pb-2 px-2 top-0 fixed `}
      >
        <View className="flex-row justify-between items-start">
          <View className="items-start gap-2">
            <TouchableOpacity
              onPress={() => navigation.navigate("User")}
              className="w-[45px] h-[45px] rounded-full border-2 border-rose-600"
            >
              <Image
                source={{ uri: user?.image }}
                className="w-full h-full "
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="text-black text-xs font-bold">
              {user?.username}👋
            </Text>
          </View>
          <View className="bg-white px-1 rounded-full">
            <Image
              resizeMode="contain"
              source={{
                uri: "https://res.cloudinary.com/dp3a4be7p/image/upload/v1666534504/logo_nb3kab.png",
              }}
              className="w-[100px] h-[30px]"
            />
          </View>
        </View>
        <View className="mt-3 flex-row items-end justify-between">
          <View className="mt-2">
            <Text className="text-black text-2xl font-semibold">
              Search Events
            </Text>
          </View>
        </View>
        <View className="mt-1 rounded-lg justify-between flex-row items-center bg-[#fff] border border-gray-300 px-3">
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-gray-800 h-11 flex-1 bg-opacity-25"
                onChangeText={(text) => onChange(text)}
                value={value}
                onSubmitEditing={(text) => {
                  setLoading(true);
                  searchFunction(text.nativeEvent.text);
                }}
                onBlur={onBlur}
                underlineColorAndroid="transparent"
                keyboardType="web-search"
                blurOnSubmit={true}
              />
            )}
            name="search"
          />

          <TouchableOpacity className="bg-gry-300 p-1 rounded-full">
            <Feather name="search" size={19} color="black" />
          </TouchableOpacity>

          {/* <View className="">
            {search ? (
              <AntDesign
                onPress={() => {}}
                name="closecircleo"
                size={19}
                color="gray"
              />
            ) : (
              <Feather
                onPress={() => {
                  reloadData();
                }}
                name="search"
                size={19}
                color="gray"
              />
            )} */}
          {/* </View> */}
        </View>
      </View>
    </BlurView>
  );
}
