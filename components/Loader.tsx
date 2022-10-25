import { ActivityIndicator, View } from "react-native";

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <View className="mx-7 items-center">
      <ActivityIndicator size="large" color="#aaa" animating />
    </View>
  ) : null;
};

export const ScreenLoader = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <View className="mx-7 h-full items-center flex-1">
      <ActivityIndicator size="large" color="#aaa" animating />
    </View>
  ) : null;
};
