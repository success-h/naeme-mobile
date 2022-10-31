import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { HomeStackScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';
import Details from '../components/event/Details';
import EventDetailHeader from '../components/event/DynamicHeader';
import DynamicHeader from '../components/event/DynamicHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailScreen({
  navigation,
  route,
}: HomeStackScreenProps<'Detail'>) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <View className="flex-1 rounded-4xl">
      <DynamicHeader
        data={route?.params.data}
        animHeaderValue={scrollOffsetY}
      />
      <ScrollView
        scrollEventThrottle={12}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={true}
        className="bg-transparent only-of-type:"
      >
        <Details data={route.params.data} />
      </ScrollView>

      <View className="w-full  bottom-0 py-4 items-center z-10">
        <TouchableOpacity
          className={`${
            Platform.OS === 'ios' ? 'mb-3' : ''
          } bg-black flex-row px-20 py-3 rounded-xl shadow-md shadow-gray-300`}
        >
          <Text className="text-gray-100 text-md font-bold mr-2">Book Now</Text>
          <FontAwesome name="ticket" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
