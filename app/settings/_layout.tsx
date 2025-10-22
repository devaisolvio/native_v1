// app/settings/_layout.tsx
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
export default function SettingsLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        animation: "slide_from_left",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ paddingHorizontal: 8 }}>
              <Feather name="arrow-left-circle" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      {/* other settings screens */}
      <Stack.Screen name="preferences/index" options={{ title: "Preferences" }}  />
      <Stack.Screen name="topics" options={{ title: "Topics you follow" }} />
      <Stack.Screen name="Reminders" options={{ title: "Reminders" }} />
  {/*     <Stack.Screen name="widgets" options={{ title: "Widgets" }} /> */}
      <Stack.Screen name="Streak" options={{ title: "Streak" }} />
    </Stack>
  );
}
