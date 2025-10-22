import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { color } from "../../../theme/palette";

export default function TermsAndConditions() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color("bg-sand-50") }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
      >
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <Feather name="file-text" size={22} color={color("text-primary")} />
          <Text
            className="text-3xl font-semibold ml-2"
            style={{ color: color("text-primary") }}
          >
            Terms & Conditions
          </Text>
        </View>

        <Text className="text-base leading-7 mb-4" style={{ color: color("text-primary") }}>
          Welcome to <Text className="font-semibold">I am</Text>! By downloading or using this app,
          you agree to the following terms.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          1. Usage
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          The app provides affirmations, reminders, and wellness content for personal
          development. You agree to use it responsibly and for personal use only.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          2. Subscription & Premium Access
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          Certain features require a paid subscription. Payments are handled through your
          app store account and renew automatically unless canceled at least 24 hours
          before renewal.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          3. Intellectual Property
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          All content, affirmations, and visual assets belong to the creators of “I am”.
          You may not copy, resell, or redistribute the app or its content.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          4. Limitation of Liability
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          This app is designed for self-reflection and mindfulness purposes only. It is not a
          substitute for professional therapy or medical advice. Use at your own discretion.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          5. Termination
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          We reserve the right to terminate accounts that violate these terms or misuse the app.
        </Text>

        <Text className="text-lg font-semibold mb-2" style={{ color: color("text-primary") }}>
          6. Contact
        </Text>
        <Text className="text-base leading-7 mb-4" style={{ color: color("text-muted") }}>
          For questions or feedback, contact us at:{" "}
          <Text className="underline">support@iamapp.com</Text>
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
