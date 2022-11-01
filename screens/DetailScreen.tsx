import { View, Text, TouchableOpacity, Platform, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { HomeStackScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';
import Details from '../components/event/Details';
import { Entypo, AntDesign } from '@expo/vector-icons';

export const BANNER_H = 420;
export const TOPNAVI_H = 0;

export default function DetailScreen({
  navigation,
  route,
}: HomeStackScreenProps<'Detail'>) {
  const scrollA = useRef(new Animated.Value(0)).current;

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={{ uri: route.params.data?.image }}
            resizeMode="cover"
          />
        </View>

        <Details data={route.params.data} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditEventModal', { data: route.params.data })
          }
          className={` ${
            Platform.OS === 'ios' ? 'top-4' : 'top-12'
          } bg-[#555556] shadow-sm shadow-gray-500 z-30 absolute rounded-full right-5 items-center p-2`}
        >
          <Entypo name="edit" size={17} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={` ${
            Platform.OS === 'ios' ? 'top-4' : 'top-12'
          } bg-[#555556] shadow-sm shadow-gray-500 z-30 absolute rounded-full left-5 items-center p-2`}
        >
          <AntDesign name="left" size={17} color="white" />
        </TouchableOpacity>
      </Animated.ScrollView>

      <TouchableOpacity
        className={`${
          Platform.OS === 'ios' ? 'mb-7' : 'mb-3'
        } bg-black flex-row px-20 py-3 rounded-xl shadow-md bottom-0 w-3/5 mx-auto`}
      >
        <Text className="text-rose-400 text-md font-bold mr-2">Book Now</Text>
        <FontAwesome name="ticket" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: (scrollA: Animated.Value) => ({
    height: BANNER_H,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};
