import { Text, TouchableOpacity, View } from 'react-native';

import { HomeStackScreenProps } from '../types';

export default function NotFoundScreen({
  navigation,
}: HomeStackScreenProps<'NotFound'>) {
  return (
    <View>
      <Text>This screen doesn't exist.</Text>
      <TouchableOpacity>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
