import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuthContext } from '../hooks/useAuth';

export default function SignIn({}) {
  const { loading, login, logout, user, setLoading, googleRegister } =
    useAuthContext();

  return (
    <View className="bg-white w-full flex-1 justify-center items-center">
      <View className="-mt-32 mb-6">
        <Text className="text-3xl text-center font-bold">
          Book Your Tickets
        </Text>
        <Text className="text-center text-red-400 text-3xl font-bold">
          Seamlessly.
        </Text>
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
      <Text className="text-lg leading-5 px-10 text-center font-semibold text mt-4">
        Discover amazing events happening around you!
      </Text>
      <View className="mt-10 items-center absolute bottom-0 mb-14">
        <Text className="text-sm px-7 mb-3 text-gray-700 mt-1 text-center font-semibold text">
          lets get you started with your account
        </Text>
        <View className="flex-row gap-10 items-start justify-between">
          <TouchableOpacity
            onPress={() => googleRegister()}
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
          <TouchableOpacity className="px-4 py-2 bg-slate-100 rounded-md">
            <AntDesign name="apple1" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 bg-slate-100 rounded-md items">
            <AntDesign name="twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
