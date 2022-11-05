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
import { EvilIcons } from '@expo/vector-icons';

import { AntDesign, Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootTabParamList } from '../types';
import { Controller, useForm } from 'react-hook-form';
import Search from './Search';
import { LinearGradient } from 'expo-linear-gradient';
import { useEventContext } from '../hooks/useEvent';
import { useAuthContext } from '../hooks/useAuth';

type NavProps = NavigationProp<RootTabParamList, 'Home'>;

interface StyleProps {
  headerStyle: string;
  locationStyle: string;
}

export default function HomeHeader() {
  return (
    <View>
      <Header
        headerStyle="text-rose-300 text-lg"
        locationStyle="text-white ml-1"
      />
      <Search />
    </View>
  );
}

export function Header({ headerStyle, locationStyle }: StyleProps) {
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
          <Text className={`font-bold ${headerStyle}`}>{user?.username}</Text>
          <View className="flex-row items-center mb-3 mt-3">
            <EvilIcons name="location" size={18} color="#ff8989" />
            {location.city && (
              <Text className={`${locationStyle} text-start`}>
                {location.city}, {location.country}
              </Text>
            )}
          </View>
        </View>
        <View className="gap-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('User')}
            className="w-[60px] h-[60px] text-[#ff8989] "
          >
            <Image
              source={{ uri: user.image }}
              className="w-full h-full rounded-full border-rose-400 border-2"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
