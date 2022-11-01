import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, useColorScheme, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation/navigator';
import { AuthProvider } from './Providers/AuthProvider';
import EventProvider from './Providers/EventProvider';

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
