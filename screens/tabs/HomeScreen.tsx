import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import NotFound from '../../components/Empty';
import EventCard from '../../components/event/EventCard';
import FeaturedEvent from '../../components/event/FeaturedEvent';
import HomeHeader from '../../components/HomeHeader';
import { Loader } from '../../components/Loader';
import { useEventContext } from '../../hooks/useEvent';
import { CompositeRootProps } from '../../types';

const HomeScreen = ({ navigation }: CompositeRootProps) => {
  const { eventData, loading, loadMoreItem, refresh, handleRefresh } =
    useEventContext();
  console.log(loading);

  return (
    <View>
      <HomeHeader />
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={eventData}
        renderItem={({ item }) => {
          return <EventCard data={item} />;
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <FeaturedEvent />
          </View>
        )}
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

      <View className="absolute top-0 bottom-0 right-0 left-0 -z-10">
        <LinearGradient
          colors={['#282c34', '#181e26', '#080908']}
          className="h-[340px]"
        />
        <View className="flex-1 bg-slate-100" />
      </View>
    </View>
  );
};
export default HomeScreen;
