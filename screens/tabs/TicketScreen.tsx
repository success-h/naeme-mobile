import {
  FlatList,
  Platform,
  Pressable,
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
  const fetchTickets = async () => {
    const response = await axios.get(
      `${serverUrl}/my-tickets/?user=${user.id}`
    );
    const data: PaidTicketResponseType = await response.data;
    if (data) {
      setTickets(data.results);
      setLoading(false);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchTickets();
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
        />
      </View>
    </SafeAreaView>
  );
}
