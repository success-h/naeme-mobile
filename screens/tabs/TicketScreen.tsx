import { Text, TouchableOpacity, View } from 'react-native';
import { RootTabScreenProps } from '../../types';

export default function TicketScreen({
  navigation,
  route,
}: RootTabScreenProps<'Ticket'>) {
  return (
    <View>
      <Text>This screen is for ticket</Text>
      <TouchableOpacity>
        <Text>Ticket Screen</Text>
        <Text>Ticket Screen</Text>
        <Text>Ticket Screen</Text>
        <Text>Ticket Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
