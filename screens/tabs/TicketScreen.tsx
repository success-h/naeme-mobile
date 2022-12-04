import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import { MyText } from '../../components/AppText';
import { TabScreenProps } from '../../types/types';

import { serverUrl } from '@env';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  PaidTicketDataTypes,
  PaidTicketResponseType,
  StringOrNull,
} from '../../types/typings';
import TicketCard from '../../components/TicketCard';
import { useIsFocused } from '@react-navigation/native';

export default function TicketScreen({
  navigation,
  route,
}: TabScreenProps<'Ticket'>) {
  console.log(route.name);
  const { user } = useAuthContext();
  const [tickets, setTickets] = useState<PaidTicketDataTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const isFocused = useIsFocused();

  const handleRefresh = async () => {
    setLoading(true);
    const data = await fetchTickets(user.id);
    setTickets(data);
    setLoading(false);
  };

  const fetchTickets = async (url: StringOrNull) => {
    const response = await axios.get(`${serverUrl}/my-tickets/?user=${url}`);
    const data: PaidTicketResponseType = await response.data;
    setLoading(false);
    return data?.results;
  };

  console.log('focus0', isFocused);

  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const data = await fetchTickets(user?.id);
        setTickets(data);
        console.log(data);
        setRefresh(false);
        setLoading(false);
      })();
    } catch (e) {
      e;
    }
    setRefresh(false);
  }, [isFocused]);

  return (
    <SafeAreaView className="bg-[#010001] flex-1 w-full">
      <View className={`px-4 ${Platform.OS === 'android' ? 'mt-4' : ''}`}>
        <MyText textStyle="open-sans-bold" style="text-gray-100 mt-10 text-2xl">
          My Tickets
        </MyText>
        {tickets.length > 1 && (
          <MyText
            textStyle="open-sans-bold"
            style="text-gray-100 text-start justify-center mt-4 text-sm"
          >
            Swipe right to see tickets
          </MyText>
        )}
        {loading && <ActivityIndicator size={'large'} />}

        {!loading && tickets.length === 0 && (
          <MyText
            textStyle="open-sans-bold"
            style="text-gray-100 text-center justify-center mt-52 text-lg"
          >
            You dont have any ticket yet
          </MyText>
        )}
        <FlatList
          data={tickets}
          renderItem={({ item }): JSX.Element => {
            return <TicketCard item={item} />;
          }}
          keyExtractor={({ id }) => id}
          horizontal={true}
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
