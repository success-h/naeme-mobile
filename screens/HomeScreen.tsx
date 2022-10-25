import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  View,
} from "react-native";
import EventCard from "../components/event/EventCard";
import HomeHeader from "../components/HomeHeader";
import { Loader } from "../components/Loader";

type Ianimation = NativeSyntheticEvent<NativeScrollEvent>;

const HomeScreen = () => {
  const [eventData, setEventData] = useState<EventDataTypes>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const ref = useRef<React.MutableRefObject<string>>();

  const fetchData = useCallback(async () => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://naeme-api.herokuapp.com/api/events/?page=${currentPage}`
      );
      const data = await response.json();
      if (eventData.length <= data.count) {
        setEventData((currentState) => [...currentState, ...data?.results]);
      }
      setIsLoading(false);
    })();
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (inputValue: string) => {
    if (!inputValue.length) return setEventData(eventData);
    // https://naeme-api.herokuapp.com/api/events/?title=whi
    (async () => {})();
    const filteredData = eventData.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (filteredData.length) {
      setEventData(filteredData);
    } else {
      setEventData(eventData);
    }
  };

  return (
    <View className="flex-1">
      <View>
        <FlatList
          data={eventData}
          renderItem={({ item }) => {
            return <EventCard data={item} />;
          }}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <HomeHeader input={input} onSearch={handleSearch} />
          )}
          ListFooterComponent={() => <Loader isLoading={isLoading} />}
          stickyHeaderIndices={Platform.OS === "ios" ? [0] : []}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      </View>
      <View className="absolute top-0 bottom-0 right-0 left-0 -z-10">
        <View className="bg-slate-100 h-[300px]" />
        <View className="flex-1 bg-slate-200" />
      </View>
    </View>
  );
};
export default HomeScreen;
