import { BlurView } from 'expo-blur';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
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
import { SafeAreaView } from 'react-native-safe-area-context';
import NotFound from '../../components/Empty';
import EventCard from '../../components/EventCard';
import FeaturedEvent from '../../components/FeaturedEvent';
import HomeHeader, { Header } from '../../components/HomeHeader';
import { Loader } from '../../components/Loader';
import MyTicket from '../../components/MyTicket';
import MyStatusBar from '../../components/StatusBar';
import StatusBar from '../../components/StatusBar';
import { useAuthContext } from '../../hooks/useAuth';
import { useEventContext } from '../../hooks/useEvent';
import {
  RootStackScreenProps,
  RootTabScreenProps,
  TabScreenProps,
} from '../../types';
import { EventDataTypes } from '../../typings';

export default function UserScreen({
  navigation,
  route,
}: RootTabScreenProps<'User'>) {
  const { user } = useAuthContext();
  const { fetchData, loading, refresh, handleRefresh } = useEventContext();
  const [myEvent, setMyEvent] = useState<EventDataTypes[]>([]);

  const Url = `https://naeme-api.herokuapp.com/api/events/?owner=${user.id}`;

  useLayoutEffect(() => {
    (async () => {
      const events: EventDataTypes[] = await fetchData(Url);
      setMyEvent(events);
    })();
  }, []);

  return (
    <View className="bg-gray-100">
      <MyStatusBar android="dark" ios="dark" />
      <Header
        locationStyle="text-gray-700 ml-1"
        headerStyle="text-gray-700 text-xl"
      />

      <View className="ml-4" style={{}}>
        <Text
          style={{ fontFamily: 'open-sans-bold' }}
          className="text-3xl mb-1"
        >
          My Events
        </Text>
        <Text className="text-gray-500">
          Tract your events progress and see event statistics
        </Text>
      </View>
      <FlatList
        // contentContainerStyle={{ paddingBottom: 220 }}
        showsHorizontalScrollIndicator={false}
        data={myEvent}
        renderItem={({ item }: { item: EventDataTypes }) => {
          return <MyTicket {...item} />;
        }}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Loader isLoading={loading} />}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
      />
      <View className="mx-4 mt-4 flex-row justify-between">
        <TouchableOpacity className="py-3 shadow-lg rounded-xl px-5 bg-black">
          <Text style={{ fontFamily: 'open-sans-bold' }} className="text-white">
            Verify Ticket
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3 rounded-xl px-5 bg-slate-100 shadow-lg">
          <Text style={{ fontFamily: 'open-sans-bold' }}>Create New Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//  style={{ fontFamily: 'open-sans-bold' }
