import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import Search from '../../components/Search';
import { useEventContext } from '../../hooks/useEvent';
import {
  RootStackScreenProps,
  RootTabScreenProps,
  TabScreenProps,
} from '../../types/types';

const HomeScreen = ({ navigation, route }: TabScreenProps<'Home'>) => {
  const {
    eventData,
    loading,
    loadMoreItem,
    refresh,
    handleRefresh,
    searching,
  } = useEventContext();

  return (
    <View>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : 'light'}
        backgroundColor="#000"
      />
      <HomeHeader />
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={eventData}
        renderItem={({ item }) => {
          return <EventCard {...item} />;
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            {/* <Search /> */}
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
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
      />

      <View className="absolute top-0 bottom-0 right-0 left-0 -z-10">
        <LinearGradient
          end={{ x: 0.1, y: 0.2 }}
          colors={['#070708', '#090a11']}
          className="h-[340px]"
        />
        <LinearGradient colors={['#eee', '#fff']} className="flex-1" />
      </View>
    </View>
  );
};
export default HomeScreen;
