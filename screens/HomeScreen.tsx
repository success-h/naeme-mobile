import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  View,
} from "react-native";
import EventCard from "../components/event/EventCard";
import HomeHeader from "../components/HomeHeader";
import { Loader, LoaderEvent } from "../components/Loader";
import { AntDesign } from "@expo/vector-icons";
import { useEventContext } from "../Providers/EventProvider";
import NotFound from "../components/Empty";

const HomeScreen = () => {
  const { eventData, loading, loadMoreItem, refresh, handleRefresh } =
    useEventContext();

  return (
    <View className="flex-1 backdrop-blur-md">
      <View className="">
        <FlatList
          data={eventData}
          renderItem={({ item }) => {
            return <EventCard data={item} />;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <HomeHeader />}
          ListFooterComponent={<Loader isLoading={loading} />}
          ListEmptyComponent={() => (
            <View>{!loading && <NotFound title="Event" />}</View>
          )}
          stickyHeaderIndices={Platform.OS === "ios" ? [0] : []}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        />
      </View>
      <View className="absolute top-0 bottom-0 right-0 left-0 -z-10">
        <View
          className={`${
            Platform.OS === "ios" ? "bg-[#080a1a]" : "bg-slate-900"
          } h-[300px]`}
        />
        <View className="flex-1 bg-slate-200" />
      </View>
    </View>
  );
};
export default HomeScreen;

// https://naeme-api.herokuapp.com/api/events/?page=1&title=holla
