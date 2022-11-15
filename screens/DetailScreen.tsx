import {
  View,
  TouchableOpacity,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { RootStackScreenProps } from '../types/types';
import { FontAwesome } from '@expo/vector-icons';
import Details from '../components/Details';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useAuthContext } from '../hooks/useAuth';
import { MyText } from '../components/AppText';
import { LinearGradient } from 'expo-linear-gradient';

export const BANNER_H = 420;
export const TOPNAVI_H = 0;

export default function DetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'Detail'>) {
  const scrollA = useRef(new Animated.Value(0)).current;
  const { user } = useAuthContext();

  const data = route.params;
  return (
    <LinearGradient
      colors={['#ffffff', '#eeeeee']}
      start={{ x: 0.9, y: 0.4 }}
      className="flex-1"
    >
      <View className="w-full absolute bottom-0 py-4 mb-2 items-center z-10">
        <Pressable className="bg-[#000000] flex-row px-20 py-3 rounded-xl shadow-md w-3/5 mx-auto">
          <MyText
            textStyle="open-sans-bold"
            style="text-[#f94c57] text-md mr-2"
          >
            Book Now
          </MyText>
          <FontAwesome name="ticket" size={16} color="#f94c57" />
        </Pressable>
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
      >
        {/*// @ts-ignore */}
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={{ uri: data.image }}
            resizeMode="cover"
          />
        </View>

        <Details {...data} />
        {data.owner === user.id && (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditEventModal', { ...data })}
            className={` ${
              Platform.OS === 'ios' ? 'top-5' : 'top-12'
            } bg-[#f7f7f7] shadow-sm shadow-gray-500 z-30 absolute rounded-full right-5 items-center p-2`}
          >
            <Entypo name="edit" size={17} color="#181818" />
          </TouchableOpacity>
        )}
        <View className="" />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={` ${
            Platform.OS === 'ios' ? 'top-5' : 'top-12'
          } bg-[#f7f7f7] shadow-sm shadow-gray-500 z-30 absolute rounded-full left-5 items-center p-2`}
        >
          <AntDesign name="arrowleft" size={17} color="#181818" />
        </TouchableOpacity>
      </Animated.ScrollView>
    </LinearGradient>
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

// f94c57;
// fc3c44;

// c2cad7;
