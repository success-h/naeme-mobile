import { ActivityIndicator, View } from "react-native";

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <View className="mx-7 my-7 h-full items-center">
      <ActivityIndicator size="large" color="#aaa" animating />
    </View>
  ) : null;
};
