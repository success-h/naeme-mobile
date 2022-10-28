import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import EventDetail from "../components/event/EventDetail";

export default function DetailScreen({
  navigation,
  route,
}: HomeStackScreenProps<"Detail">) {
  return (
    <View className="flex-1 bg-slate-200">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <EventDetail data={route?.params.data} />
      </ScrollView>

      <View className="w-full absolute bottom-0 py-4 items-center z-10">
        <TouchableOpacity
          className={`${
            Platform.OS === "ios" ? "mb-3" : ""
          } bg-black flex-row px-20 py-3 rounded-xl shadow-md shadow-gray-300`}
        >
          <Text className="text-gray-100 text-md font-bold mr-2">Book Now</Text>
          <FontAwesome name="ticket" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
