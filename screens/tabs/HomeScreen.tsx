import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
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
import EventCard from '../../components/EventCard';
import FeaturedEvent from '../../components/FeaturedEvent';
import HomeHeader from '../../components/HomeHeader';
import { Loader } from '../../components/Loader';
import { useEventContext } from '../../hooks/useEvent';
import { RootTabScreenProps } from '../../types';

const HomeScreen = ({ navigation, route }: RootTabScreenProps<'Home'>) => {
  const { eventData, loading, loadMoreItem, refresh, handleRefresh } =
    useEventContext();

  return (
    <View>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : 'light'}
        backgroundColor="#000"
      />
      <HomeHeader />
      <FlatList
        contentContainerStyle={{ paddingBottom: 220 }}
        data={eventData}
        renderItem={({ item }) => {
          return <EventCard {...item} />;
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
            {!loading && eventData?.length === 0 && <NotFound title="event" />}
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
