import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import { RootStackScreenProps } from '../types';

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
      <View>
        <Text></Text>
      </View>
    </View>
  );
}
