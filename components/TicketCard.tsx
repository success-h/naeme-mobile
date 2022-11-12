import { serverUrl } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useLayoutEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../types/types';
import { EventDataTypes, TicketDataTypes } from '../types/typings';
import { MyText } from './AppText';

type NavigationPrp = NavigationProp<RootStackParamList, 'Detail'>;

export default function TicketCard(props: TicketDataTypes) {
  const [ticketEvent, setTicketEvent] = useState({} as EventDataTypes);
  console.log(ticketEvent);
  console.log(ticketEvent);

  const fetchTickets = async () => {
    if (props.id) {
      const response = await axios.get(`${serverUrl}/events/${props.event}`);
      const data = await response.data;
      console.log('data', data);
      if (data) {
        setTicketEvent(data);
      }
    }
  };

  useLayoutEffect(() => {
    console.log('...........called..............');
    fetchTickets();
  }, []);

  const navigation = useNavigation<NavigationPrp>();

  return (
    <LinearGradient
      colors={['#0A0A0A', '#0A0A0A', '#0E0E17']}
      end={[0.1, 0.8]}
      className="h-[500px] mt-20 w-[310px] rounded-3xl mx-2 px-4 py-5"
    >
      <Pressable
        onPress={() => navigation.navigate('Detail', { ...ticketEvent })}
      >
        <MyText
          textStyle="open-sans-bold"
          style="text-white text-[#d73717] text-2xl"
        >
          {ticketEvent.title}
        </MyText>
        <View className="flex-row mt-3">
          <Text
            style={{ fontFamily: 'open-sans-semi' }}
            className="text-[#fff] rounded-full text-sm"
          >
            {props.title}
          </Text>
        </View>
        <Image source={{ uri: props.qr_code }} />
      </Pressable>
    </LinearGradient>
  );
}
