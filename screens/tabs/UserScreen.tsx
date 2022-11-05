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

  useEffect(() => {
    (async () => {
      const events: EventDataTypes[] = await fetchData(Url);
      setMyEvent(events);
    })();
  }, []);

  return (
    <View className="bg-slate-100">
      <MyStatusBar android="dark" ios="dark" />
      <Header
        locationStyle="text-gray-700 ml-1"
        headerStyle="text-gray-700 text-xl"
      />

      <View>
        <Text>Tract your events progress and see event statistics</Text>
      </View>
      <FlatList
        // contentContainerStyle={{ paddingBottom: 220 }}
        data={myEvent}
        renderItem={({ item }: { item: EventDataTypes }) => {
          return <EventCard {...item} />;
        }}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Loader isLoading={loading} />}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}
//  style={{ fontFamily: 'open-sans-bold' }
