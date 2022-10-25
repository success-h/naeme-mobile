import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, Text, useColorScheme, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation/navigator";
import { AuthProvider } from "./Providers/AuthProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <React.Fragment>
          <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
          <Navigation />
        </React.Fragment>
      </AuthProvider>
    );
  }
}
