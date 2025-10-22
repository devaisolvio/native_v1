import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { color } from "../../../theme/palette";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color("bg-sand-50") }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
      >
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <Feather name="lock" size={22} color={color("text-primary")} />
          <Text
            className="text-3xl font-semibold ml-2"
            style={{ color: color("text-primary") }}
          >
            Privacy Policy
          </Text>
        </View>

        {/* Content */}
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-primary") }}>
          At <Text className="font-semibold">I am</Text>, your privacy is a priority. This policy
          explains how we handle your information when you use our app.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          1. Data We Collect
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          We collect minimal data necessary to improve your experience. This includes:
          {"\n"}- App preferences and selected themes
          {"\n"}- Usage analytics (anonymized)
          {"\n"}- Optional reminders or notifications you set
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          2. How We Use Data
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          Your information helps us personalize affirmations, track your streaks,
          and maintain app functionality. We never sell or share your data with third parties.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          3. Local Storage
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          Most data such as affirmations, preferences, and streaks are stored locally on your
          device for privacy and performance reasons.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          4. Third-Party Services
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          We may use analytics services (e.g., Expo or Firebase) to understand general usage
          patterns. These do not store personal identifiers.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          5. Your Rights
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          You may delete your app data at any time by clearing local storage or uninstalling the app.
          For further help, reach out at: <Text className="underline">support@iamapp.com</Text>
        </Text>

        <Text
          className="text-xs mt-6 text-center"
          style={{ color: color("text-muted") }}
        >
          Last updated: October 2025
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
