import { View, Text, GestureResponderEvent } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
  textStyle?: string;
  style: string;
  children: ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export function MyText({ style, textStyle, children, onPress }: Props) {
  return (
    <Text
      onPress={onPress}
      style={{ fontFamily: textStyle ? textStyle : 'open-sans-regular' }}
      className={style}
    >
      {children}
    </Text>
  );
}
