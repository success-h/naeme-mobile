import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import { ModalScreenProps } from "../types";

export default function EditEventModal({
  navigation,
  route,
}: ModalScreenProps<"EditEventModal">) {
  return (
    <View>
      <Text>Modal</Text>
      <View />
    </View>
  );
}
