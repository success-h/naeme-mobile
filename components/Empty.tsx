import { View, Text, Image } from 'react-native';
import React from 'react';
import { Loader } from './Loader';
import { useEventContext } from '../hooks/useEvent';

export default function NotFound({ title }: { title: string }) {
  const { loading } = useEventContext();
  if (loading) return <Loader isLoading={loading} />;
  return (
    <View className="bg-white min-h-[70px]  items-center justify-center">
      <View></View>
      <Text className="w-3/5 text-2xl text-gray-600 text-center">
        No {title} match in our database
      </Text>
      <Text className="w-3/5  text-xl font-bold text-center">
        Please refresh screen
      </Text>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/dp3a4be7p/image/upload/v1666849067/undraw_void_3ggu_lwaqc3.png',
        }}
        className="h-[200px] w-full"
        resizeMode="contain"
      />
    </View>
  );
}
