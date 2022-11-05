import { View, Text, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import React from 'react';

interface Props {
  android: string;
  ios: string;
}

export default function MyStatusBar({ android, ios }: Props) {
  return (
    <StatusBar
      style={Platform.OS === 'ios' ? ios : android}
      backgroundColor="#000"
    />
  );
}
