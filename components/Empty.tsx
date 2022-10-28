import { View, Text, Image } from "react-native";
import React from "react";

export default function NotFound({ title }: { title: string }) {
  return (
    <View className="bg-white min-h-[700px]  items-center justify-center">
      <View></View>
      <Text className="w-3/5 text-2xl text-center">
        Not {title} match in our database
      </Text>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dp3a4be7p/image/upload/v1666849067/undraw_void_3ggu_lwaqc3.png",
        }}
        className="h-[200px] w-full"
        resizeMode="contain"
      />
    </View>
  );
}
