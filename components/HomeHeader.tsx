import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { ReactNode, useRef } from "react";
import { useAuthContext } from "../Providers/AuthProvider";
import { BlurView } from "expo-blur";

interface HomeHeaderTypes {
  handleSearch: (inputValue: string) => ReactNode;
}
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeRootStackParamList } from "../types";

type NavProps = NavigationProp<HomeRootStackParamList, "User">;

export default function HomeHeader({
  onSearch,
  input,
}: {
  onSearch: (inputValue: string) => void;
  input: string;
}) {
  const navigation = useNavigation<NavProps>();
  const { user } = useAuthContext();
  return (
    <BlurView intensity={50}>
      <View
        className={`${
          Platform.OS === "ios" ? "pt-14" : "pt-10 bg-slate-100"
        } pb-2 px-2 top-0 fixed`}
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
        <View className="mt-1 w-full rounded-lg flex-row items-center bg-[#fff] border border-gray-300 px-3">
          <View className="mr-2">
            <AntDesign name="search1" size={19} color="gray" />
          </View>
          <TextInput
            placeholder="Search NFTs"
            placeholderTextColor="white"
            className="text-gray--800 h-11 w-full bg-opacity-25"
            onChangeText={(text) => onSearch(text)}
            value={input}
          />
        </View>
      </View>
    </BlurView>
  );
}
