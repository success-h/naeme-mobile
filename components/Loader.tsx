import { ActivityIndicator, View } from 'react-native';
import { MyText } from './AppText';

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <View className="mx-7 my-7 justify-center items-center">
      <ActivityIndicator size="large" color="#aaa" animating />
    </View>
  ) : null;
};

export const MyEventLoaderScreen = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <View className="mx-7 my-7 justify-center items-center">
      <ActivityIndicator size="large" color="#aaa" animating />
    </View>
  ) : (
    <View className="mx-4 mt-7">
      <MyText style="font-bold text-xl">
        You have not created any event yet
      </MyText>
    </View>
  );
};
