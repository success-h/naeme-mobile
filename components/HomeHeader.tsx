import { View, Platform } from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';
import Search from './Search';

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
    </View>
  );
}

export function Header({ headerStyle, locationStyle }: StyleProps) {
  return (
    <View
      className={`${
        Platform.OS === 'ios' ? 'pt-14' : 'pt-10'
      } pb-2 px-4  relative shadow-2xl mt-3`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Search />
        </View>
      </View>
    </View>
  );
}
