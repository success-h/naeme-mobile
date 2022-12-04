import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyText } from '../components/AppText';
import { useAuthContext } from '../hooks/useAuth';

export default function SignIn({}) {
  const { googleAuth } = useAuthContext();

  return (
    <SafeAreaView className="bg-white h-full w-full items-center">
      <View className="mt-[17%]">
        <MyText textStyle="open-sans-bold" style="text-3xl text-center">
          Book Your Tickets
        </MyText>
        <MyText
          textStyle="open-sans-bold"
          style="text-center text-red-400 text-3xl font-bold"
        >
          Seamlessly.
        </MyText>
        <MyText
          textStyle="open-sans-medium"
          style="text-sm leading-5 text-gray-600 px-10 text-center text"
        >
          Discover amazing events happening around you!
        </MyText>
      </View>
      <View className="w-[70%] z-10 h-[40%] mt-[10%]">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dp3a4be7p/image/upload/v1667131028/homes_fl8y0e.png',
          }}
          className="h-full w-fll shadow-2xl"
          resizeMode="contain"
        />
      </View>
      <View className="items-center mt-[3%] bottom-0">
        <MyText
          textStyle="open-sans-bold"
          style="text-sm px-7 mb-3 text-gray-700 mt-1 text-center text"
        >
          lets get you started with your account
        </MyText>
        <View className="flex-row gap-10 mt-[-3%] items-start justify-between">
          <TouchableOpacity
            onPress={() => googleAuth()}
            className="px-4 py-2 bg-[#000] rounded-md"
          >
            <MyText
              textStyle="open-sans-bold"
              style="text-sm px-7 mb-3 text-gray-100 mt-1 text-center text"
            >
              Continue with google
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
