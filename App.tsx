import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, useColorScheme, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation/navigator';
import { AuthProvider } from './Providers/AuthProvider';
import EventProvider from './Providers/EventProvider';
import 'expo-dev-client';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <EventProvider>
          <React.Fragment>
            <StatusBar
              style={Platform.OS === 'ios' ? 'light' : 'light'}
              backgroundColor="#000"
            />
            <Navigation />
          </React.Fragment>
        </EventProvider>
      </AuthProvider>
    );
  }
}
