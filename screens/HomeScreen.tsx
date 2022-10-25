import { useEffect, useState } from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../components/event/EventCard";
import HomeHeader from "../components/HomeHeader";
import { LinearGradient } from "expo-linear-gradient";
import { HomeRootStackParamList } from "../types";

const HomeScreen = () => {
  const [eventData, setEventData] = useState<EventDataTypes>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://naeme-api.herokuapp.com/api/events/"
      );
      const data = await response.json();
      setEventData((state) => [...data?.results]);
    })();
  }, []);

  return (
    <View className="flex-1">
      <View>
        <View className="">
          <FlatList
            data={eventData}
            renderItem={({ item }) => <EventCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <HomeHeader />}
            stickyHeaderIndices={[0]}
          />
        </View>
      </View>
      <View className="absolute top-0 bottom-0 right-0 left-0 -z-10">
        <View className="bg-white h-[300px]" />
        <View className="flex-1 bg-sky-50" />
      </View>
    </View>
  );
};
export default HomeScreen;
