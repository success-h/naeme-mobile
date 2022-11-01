import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';
import { useAuthContext } from '../Providers/AuthProvider';
import { BlurView } from 'expo-blur';
import { EvilIcons } from '@expo/vector-icons';

import { AntDesign, Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, RootTabParamList } from '../types';
import { useEventContext } from '../Providers/EventProvider';
import { Controller, useForm } from 'react-hook-form';
import Search from './Search';
import { LinearGradient } from 'expo-linear-gradient';
import FeaturedEvent from './event/FeaturedEvent';

type NavProps = NavigationProp<RootTabParamList, 'Home'>;

export default function HomeHeader() {
  return (
    <View>
      <Header />
    </View>
  );
}

function Header() {
  const { user } = useAuthContext();
  const { location } = useEventContext();

  const navigation = useNavigation<NavProps>();

  return (
    <View
      className={`${
        Platform.OS === 'ios' ? 'pt-14' : 'pt-10'
      } pb-2 px-4  relative shadow-2xl mt-2`}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-md font-semibold mb-1 text-s text-[#ff6f6f]">
            {user?.username}
          </Text>
          <View className="flex-row items-center mb-3">
            <EvilIcons name="location" size={18} color="#ff6f6f" />
            {location.city && (
              <Text className="ml-2 text-[#d8d1d1]">
                {location.city}, {location.country}
              </Text>
            )}
          </View>
        </View>
        <View className="gap-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('User')}
            className="w-[50px] h-[50px]"
          >
            <Image
              source={{ uri: user?.image }}
              className="w-full h-full rounded-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Search />
    </View>
  );
}
