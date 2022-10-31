import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Platform, RefreshControl, Text, View } from 'react-native';
import EventCard from '../components/event/EventCard';
import { Loader } from '../components/Loader';
import { useEventContext } from '../Providers/EventProvider';
import NotFound from '../components/Empty';
import { LinearGradient } from 'expo-linear-gradient';
import FeaturedEventCard from '../components/event/FeaturedEvent';
import HomeHeader from '../components/HomeHeader';
import Search from '../components/Search';

const HomeScreen = () => {
  const { eventData, loading, loadMoreItem, refresh, handleRefresh } =
    useEventContext();

  return (
    <View>
      <HomeHeader />
      <Text className="px-4 my-2 font-bold">Popular Events</Text>
      <FlatList
        data={eventData}
        renderItem={({ item }) => {
          return <FeaturedEventCard data={item} />;
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        ListFooterComponent={<Loader isLoading={loading} />}
        ListEmptyComponent={() => (
          <View>
            {!loading && eventData.length === 0 && <NotFound title="event" />}
          </View>
        )}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
      />
      <FlatList
        data={eventData}
        className=""
        renderItem={({ item }) => {
          return <EventCard data={item} />;
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Search />}
        ListFooterComponent={<Loader isLoading={loading} />}
        ListEmptyComponent={() => (
          <View>
            {!loading && eventData.length === 0 && <NotFound title="event" />}
          </View>
        )}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};
export default HomeScreen;
