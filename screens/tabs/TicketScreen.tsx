import {
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyText } from '../../components/AppText';
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabScreenProps,
  TabScreenProps,
} from '../../types/types';

import { serverUrl } from '@env';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuth';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  EventDataTypes,
  ResponseType,
  PaidTicketDataTypes,
  PaidTicketResponseType,
  StringOrNull,
} from '../../types/typings';
import { MyEventLoaderScreen } from '../../components/Loader';
import { useEventContext } from '../../hooks/useEvent';
import TicketCard from '../../components/TicketCard';

export default function TicketScreen({
  navigation,
  route,
}: TabScreenProps<'Ticket'>) {
  console.log(route.name);
  const { user } = useAuthContext();
  const [tickets, setTickets] = useState<PaidTicketDataTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const handleRefresh = async () => {
    setLoading(true);
    const data = await fetchTickets(user?.id);
    setTickets(data);
    setLoading(false);
  };

  const fetchTickets = async (url: StringOrNull) => {
    const response = await axios.get(`${serverUrl}/my-tickets/?user=${url}`);
    const data: PaidTicketResponseType = await response.data;
    setLoading(false);
    return data?.results;
  };

  useEffect(() => {
    setRefresh(false);
    (async () => {
      const data = await fetchTickets(user?.id);
      setTickets(data);
      setRefresh(false);
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView className="bg-[#010001] flex-1 w-full">
      <View className={`px-4 ${Platform.OS === 'android' ? 'mt-4' : ''}`}>
        <MyText textStyle="open-sans-bold" style="text-gray-100 mt-10 text-2xl">
          Tickets
        </MyText>

        <FlatList
          data={tickets}
          renderItem={({ item }): JSX.Element => <TicketCard {...item} />}
          keyExtractor={({ id }) => id}
          horizontal={true}
          ListEmptyComponent={
            <MyEventLoaderScreen title="ticket" isLoading={loading} />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}
