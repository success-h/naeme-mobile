import { useLayoutEffect } from "react";
import { Platform, Text, View } from "react-native";
import { ModalScreenProps } from "../types";

export default function EditEventModal({
  navigation,
  route,
}: ModalScreenProps<"EditEventModal">) {
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `${route.params.data.title}` });
  }, []);

  return (
    <View>
      <Text>Modal</Text>
      <View />
    </View>
  );
}
