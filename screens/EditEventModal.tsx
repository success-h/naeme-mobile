import { useLayoutEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import { RootStackScreenProps } from '../types/types';

export default function EditEventModal({
  navigation,
  route,
}: RootStackScreenProps<'EditEventModal'>) {
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `${route.params.title}` });
  }, []);

  return (
    <View>
      <Text>Modal</Text>
      <View></View>
    </View>
  );
}
