import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "../src/store/useAuthStore";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { token, isLoading, initializeAuth } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(tabs)" || segments[0] === "habit";
    const inLoginGroup = segments[0] === "login" || segments[0] === "signup";

    if (!token && inAuthGroup) {
      router.replace("/login");
    } else if (token && inLoginGroup) {
      router.replace("/(tabs)");
    }
  }, [token, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: "Criar Conta" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="habit/[id]"
        options={{ title: "Detalhes do Hábito" }}
      />
    </Stack>
  );
}
