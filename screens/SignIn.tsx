import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { MyText } from '../components/AppText';
import { useAuthContext } from '../hooks/useAuth';

export default function SignIn({}) {
  const { loading, login, logout, user, setLoading, googleAuth } =
    useAuthContext();

  return (
    <View className="bg-white w-full flex-1 justify-center items-center">
      <View className="-mt-32 mb-6">
        <MyText textStyle="open-sans-bold" style="text-3xl text-center">
          Book Your Tickets
        </MyText>
        <MyText
          textStyle="open-sans-bold"
          style="text-center text-red-400 text-3xl font-bold"
        >
          Seamlessly.
        </MyText>
      </View>
      <View className="w-[350px] z-10 h-[350px]">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dp3a4be7p/image/upload/v1667131028/homes_fl8y0e.png',
          }}
          className="h-full w-fll shadow-2xl"
          resizeMode="contain"
        />
      </View>
      <View className="h-80 bg-slate-200 rounded-full -mt-80 w-80" />
      <MyText
        textStyle="open-sans-medium"
        style="text-lg leading-5 px-10 text-center text mt-4"
      >
        Discover amazing events happening around you!
      </MyText>
      <View className="items-center absolute bottom-0 mb-28">
        <MyText
          textStyle="open-sans-bold"
          style="text-sm px-7 mb-3 text-gray-700 mt-1 text-center text"
        >
          lets get you started with your account
        </MyText>
        <View className="flex-row gap-10 items-start justify-between">
          <TouchableOpacity
            onPress={() => googleAuth()}
            className="px-4 py-2 bg-slate-100 rounded-md"
          >
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dp3a4be7p/image/upload/v1667132554/google_logo_oedjai.png',
              }}
              className="h-[24px] w-[24px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
