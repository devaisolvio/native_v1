// app/settings/index.tsx
import React from "react";
import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link,Href } from "expo-router";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "../../theme/palette"; // keep your path

export default function SettingsHome() {
    let premium = true
  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:"rgba(255, 218, 185, 0.25)"}  }>
    

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <View className="px-5 pb-6">
          {/* Promo banner */}
          { premium &&
          <View className="rounded-3xl p-6 mb-6" style={{ backgroundColor: color("promo-navy") }}>
            <View className="pr-16">
              <Text className="text-white text-2xl font-bold mb-2">Try I am Premium</Text>
              <Text className="text-white/90 text-base leading-6">
                Access all categories, affirmations, themes, and remove ads!
              </Text>
            </View>
            <View className="absolute right-6 top-6">
              <Feather name="hexagon" size={32} color="white" />
            </View>
          </View>
}

          {/* Streak card */}
          <View className="bg-white rounded-3xl p-6 mb-6">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-xl font-semibold" style={{ color: color("text-primary") }}>
                Your streak
              </Text>
              <Feather name="share-2" size={20} color={color("icon-muted")} />
            </View>

            <View className="flex-row items-center">
              {/* Streak circle */}
              <View
                className="w-16 h-16 rounded-full items-center justify-center mr-5"
                style={{ borderWidth: 2.5, borderColor: color("text-primary") }}
              >
                <Text className="text-2xl font-semibold" style={{ color: color("text-primary") }}>
                  1
                </Text>
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={18}
                  color={color("text-primary")}
                  style={{ position: "absolute", right: -8, top: -8 }}
                />
              </View>

              {/* Week labels + dots */}
              <View className="flex-1">
                <View className="flex-row justify-between mb-3 px-1">
                  {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                    <Text key={d} className="text-xs font-medium" style={{ color: color("icon-muted") }}>
                      {d}
                    </Text>
                  ))}
                </View>
                <View className="flex-row justify-between">
                  <View className="w-7 h-7 rounded-full items-center justify-center bg-[#F3A7A2]">
                    <Feather name="check" size={16} color="white" />
                  </View>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <View key={i} className="w-7 h-7 rounded-full bg-[#E8E8E8]" />
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* SETTINGS group title */}
          <Text
            className="text-xs font-bold tracking-wider mb-3 px-1"
            style={{ color: color("text-primary") }}
          >
            SETTINGS
          </Text>

          {/* Grouped settings card */}
          <View className="bg-white rounded-3xl overflow-hidden">
            <Row href={"/settings/preferences/Index" as Href}
              icon={<Feather name="settings" size={20} color={color("text-primary")} />}
              title="Preferences"
            />
            <Divider />
            <Row href={"/settings/topics" as Href}
              icon={<Feather name="check-circle" size={20} color={color("text-primary")} />}
              title="Topics you follow"
            />
            <Divider />
           {/*  <Row href={"/settings/app-icon" as Href}
              icon={
                <View className="w-10 h-10 rounded-2xl items-center justify-center bg-[#F3A7A2]">
                  <Text className="text-xs font-medium" style={{ color: color("text-primary") }}>
                    I am
                  </Text>
                </View>
              }
              title="App icon"
            />
            <Divider /> */}
            <Row href={"/settings/reminders" as Href}
              icon={<Feather name="bell" size={20} color={color("text-primary")} />}
              title="Reminders"
            />
            <Divider />
            <Row href={"/settings/widgets" as Href}
              icon={<Feather name="grid" size={20} color={color("text-primary")} />}
              title="Widgets"
            />
            <Divider />
            <Row href={"/settings/streak" as Href}
              icon={
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ borderWidth: 2, borderColor: color("text-primary") }}
                >
                  <Text className="text-base font-semibold" style={{ color: color("text-primary") }}>
                    7
                  </Text>
                </View>
              }
              title="Streak"
            />
          </View>
        </View>

        <View className="h-8" />
        {Platform.OS === "ios" && <View className="h-4" />}
      </ScrollView>
    </SafeAreaView>
  );
}

/* Row: wraps Pressable with <Link> so navigation works */
function Row({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  href: Href;
}) {
  return (
    <Link href={href} asChild>
      <Pressable className="px-6 py-4 flex-row items-center justify-between active:opacity-70">
        <View className="flex-row items-center flex-1">
          <View className="w-10 items-center justify-center mr-4">{icon}</View>
          <Text className="text-lg" style={{ color: color("text-primary") }}>
            {title}
          </Text>
        </View>
        <Feather name="chevron-right" size={22} color={color("icon-muted")} />
      </Pressable>
    </Link>
  );
}

function Divider() {
  return <View className="h-[1px] mx-6" style={{ backgroundColor: color("divider") }} />;
}
