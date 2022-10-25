import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, Octicons, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Countdown } from "../../Utils/CountDown";
import { HomeRootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type NavigationProps = NativeStackNavigationProp<
  HomeRootStackParamList,
  "EditEventModal"
>;

export default function EventDetail({ data }: DataProps) {
  // hooks calls
  const navigation = useNavigation<NavigationProps>();

  // date functions
  const dt = moment(data.end_date + " " + data?.end_time, "DD/MM/YYYY HH:mm");
  const targetTime = moment(dt);
  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));
  const time = moment(data.start_time, "HH:mm").format("h:mm A");
  const date = moment(data.end_date).format("MMMM D, YYYY");

  // description read more
  const [readMore, setReadMore] = useState(false);
  const [text, setText] = useState<string>(data.description.slice(0, 200));

  return (
    <View>
      <Image
        source={{ uri: data.image }}
        className="w-full h-[343px]"
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("EditEventModal", { data })}
        className="bg-emerald-300 h-10 w-10 absolute rounded-full top-[280px] right-5 items-center p-2"
      >
        <Entypo name="edit" size={24} color="black" />
      </TouchableOpacity>
      <View className="bg-white mx-4 rounded-xl shadow-md shadow-gray-200 mt-7 p-4">
        <TouchableOpacity className="p-2 mt-1 rounded-full flex-row items-center justify-between bg-emerald-300">
          <View className="flex-row items-center">
            <Entypo name="time-slot" size={24} color="black" />
            <Countdown end_date={data.end_date} end_time={data.end_time} />
          </View>
          <View className="flex-row gap-1 items-center">
            <AntDesign name="clockcircle" size={19} color="black" />
            <Text className="font-semibold text-md mr-1 text-gray-700">
              {time}
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row items-center mt-5 gap-x-2">
          <View className="p-2 items-center justify-center h-8 w-8 rounded-full bg-rose-300">
            <Ionicons name="md-calendar" size={16} color="black" />
          </View>
          <Text className="text-lg text-gray-700">{date}</Text>
        </View>
        <View className="flex-row items-center mt-3 gap-x-2">
          <View className="p-2 items-center justify-center h-8 w-8 rounded-full bg-sky-300">
            <Octicons name="location" size={16} color="black" />
          </View>
          <Text className="text-lg text-gray-700">{data.location}</Text>
        </View>
        <View className="flex-row mt-3 items-center justify-between">
          <View>
            {!data.lowest_price && !data.highest_price ? (
              <Text className="text-lg font-bold">$0.00</Text>
            ) : data?.lowest_price === data?.highest_price ? (
              <View>
                <Text className="text-lg font-bold">${data.lowest_price}</Text>
              </View>
            ) : (
              <View>
                <Text className="text-lg font-bold ">
                  {data.lowest_price} - {data.highest_price}
                </Text>
              </View>
            )}
          </View>
          <View>
            {data.total_ticket_count - data.sold_ticket_count > 0 && (
              <Text>
                {data.total_ticket_count - data.sold_ticket_count} available
              </Text>
            )}
            {data.total_ticket_count === data.sold_ticket_count && (
              <Text>Tickets sold out</Text>
            )}
          </View>
        </View>

        <View className="mt-4">
          <Text className="font-semibold mt-3 text-lg">Description:</Text>
          <Text className="text-gray-700 leading-5">
            {text} {!readMore && "..."}
            <Text
              onPress={() => {
                if (!readMore) {
                  setText(data.description);
                  setReadMore(true);
                } else {
                  setText(data.description.slice(0, 300));
                  setReadMore(false);
                }
              }}
              className="font-bold text-black"
            >
              {readMore ? "Show Less" : "Read More"}
            </Text>
          </Text>
        </View>
      </View>

      <View className="h-96 bg-white mt-7 mb-14">
        <Text className="my-4 mx-4 text-2xl">Map Here</Text>
      </View>
    </View>
  );
}
