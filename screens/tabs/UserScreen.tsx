import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyText } from '../../components/AppText';

import { Loader, MyEventLoaderScreen } from '../../components/Loader';
import MyEvent from '../../components/MyEvent';
import { useAuthContext } from '../../hooks/useAuth';
import { useEventContext } from '../../hooks/useEvent';
import { defaultUser } from '../../Providers/AuthProvider';
import {
  RootStackScreenProps,
  RootTabScreenProps,
  TabScreenProps,
} from '../../types/types';
import { EventDataTypes } from '../../types/typings';

export default function UserScreen({
  navigation,
  route,
}: RootTabScreenProps<'User'>) {
  const { user, setUser } = useAuthContext();
  const { fetchData, refresh, handleRefresh } = useEventContext();
  const [myEvent, setMyEvent] = useState<EventDataTypes[]>([]);
  const [logoutLoading, setlogoutLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const Url = `https://naeme-api.herokuapp.com/api/events/?owner=${user.id}`;

  useLayoutEffect(() => {
    (async () => {
      const events: EventDataTypes[] = await fetchData(Url);
      setMyEvent(events);
      setLoading(false);
    })();
  }, []);

  return (
    <LinearGradient colors={['#fff', '#fff', '#eee']} className="flex-1">
      <StatusBar animated={true} style="light" />
      <LinearGradient
        colors={['#070708', '#272b31']}
        className="pt-20 pb-4 px-4 items-center bg-rose-100 flex-row justify-between rounded-b-3xl shadow-lg"
      >
        <View>
          <Text className="text-md font-bold text-[#a9a9a9]">Hello</Text>
          <Text className="text-xl font-bold text-[#faf8f8]">
            {user.username}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setlogoutLoading(true);
              setTimeout(() => {
                AsyncStorage.removeItem('naemeUser')
                  .then(() => {
                    setUser(defaultUser);
                  })
                  .catch((e) => console.log(e));
                setlogoutLoading(false);
              }, 2000);
            }}
            className="px-3 mt-3 py-1 w-[73px] rounded-2xl  border border-white"
          >
            {logoutLoading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white">Logout</Text>
            )}
          </TouchableOpacity>
        </View>
        <View className="items-end">
          <Image
            source={{ uri: user.image }}
            className="w-[60px] h-[60px] -mt-7 rounded-full border-[#fdb4b4] border"
            resizeMode="contain"
          />
          <TouchableOpacity
            className="bg-slate-700 px-2 py-1 -mb-2 mt-4 rounded-xl"
            onPress={() => navigation.navigate('CreateEvent', { ...user })}
          >
            <MyText textStyle="open-sans-bold" style="text-white">
              Create Event
            </MyText>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View className="mt-4">
        <View style={{}} className="mx-4 mb-6">
          <Text
            style={{ fontFamily: 'open-sans-bold' }}
            className="text-xl my-2"
          >
            My Events
          </Text>
          <Text className="text-gray-500">See events created by you.</Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 300 }}
          data={myEvent}
          renderItem={({ item }: { item: EventDataTypes }) => {
            return <MyEvent {...item} />;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<Loader isLoading={loading} />}
          ListEmptyComponent={
            <MyEventLoaderScreen title="event" isLoading={loading} />
          }
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        />
      </View>
    </LinearGradient>
  );
}

// d73717;
