import {
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyText } from '../../components/AppText';
import { RootTabScreenProps } from '../../types/types';

import { serverUrl } from '@env';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuth';
import { useLayoutEffect, useState } from 'react';
import { TicketDataTypes, TicketResponseType } from '../../types/typings';

export default function TicketScreen({
  navigation,
  route,
}: RootTabScreenProps<'Ticket'>) {
  const { user } = useAuthContext();
  const [tickets, setTickets] = useState<TicketDataTypes[]>([]);
  console.log({ tickets });
  const fetchTickets = async () => {
    const response = await axios.get(
      `${serverUrl}/my-tickets/?user=${user.id}`
    );
    const data: TicketResponseType = await response.data;
    if (data) {
      setTickets(data.results);
    }
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
        />
      </View>
    </SafeAreaView>
  );
}

function TicketCard({ title }: TicketDataTypes) {
  return (
    <View className="bg-[#111115] h-[500px] mt-20 w-[310px] rounded-3xl mx-2">
      <MyText style="text-white">{title}</MyText>
    </View>
  );
}
