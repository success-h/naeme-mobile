import { Text, TouchableOpacity, View } from 'react-native';
import { RootTabScreenProps } from '../../types/types';

export default function ScannerScreen({
  navigation,
  route,
}: RootTabScreenProps<'Scan'>) {
  return (
    <View>
      <Text>This screen is for scanner</Text>
      <TouchableOpacity>
        <Text>Ticket scan screen</Text>
        <Text>Ticket scan screen</Text>
        <Text>Ticket scan screen</Text>
        <Text>Ticket scan screen</Text>
        <Text>Ticket scan screen</Text>
      </TouchableOpacity>
    </View>
  );
}
