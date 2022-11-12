import { Text, TouchableOpacity, View } from 'react-native';
import { MyText } from '../components/AppText';
import { RootStackScreenProps } from '../types/types';

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  return (
    <View>
      <MyText style="">This screen doesn't exist.</MyText>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <MyText style="">Go to home screen!</MyText>
      </TouchableOpacity>
    </View>
  );
}
