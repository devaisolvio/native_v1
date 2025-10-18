// components/SettingsModal.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "../theme/palette";

type Props = { visible: boolean; onClose: () => void };

export default function SettingsModel({ visible, onClose }: Props) {
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();

  // ✅ React flag to control mount/unmount (don’t read .value in render)
  const [mounted, setMounted] = useState(visible);
  const ANIM_MS = 260;

  useEffect(() => {
    if (visible) {
      setMounted(true); // mount, then animate in
      progress.value = withTiming(1, { duration: ANIM_MS });
    } else {
      // animate out, then unmount
      progress.value = withTiming(0, { duration: ANIM_MS });
      const t = setTimeout(() => setMounted(false), ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [visible]);

  // Backdrop opacity follows progress (0→1)
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  // Slide panel from left: -width → 0
  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [-width, 0]) }],
  }));

  // ✅ safe: no .value reads in render
  if (!mounted) return null;

  return (
    <>
      {/* Backdrop (full screen) */}
      <Animated.View
        style={[StyleSheet.absoluteFill, backdropStyle]}
        pointerEvents={visible ? "auto" : "none"}
      >
        <View className="flex-1 bg-black/40" />
        <Pressable className="absolute inset-0" onPress={onClose} />
      </Animated.View>

      {/* Sliding panel (full screen) */}
      <View className="absolute inset-0">
        <View className="absolute inset-0 bg-bg-sand-50">
          <Animated.View style={[StyleSheet.absoluteFill, panelStyle]}>
            <SafeAreaView style={{ flex: 1 }}>
              {/* Header */}
              <View className="flex-row items-center px-5 pt-2 pb-4">
                <Pressable
                  onPress={onClose}
                  className="w-10 h-10 rounded-full items-center justify-center -ml-2"
                >
                  <Ionicons name="close" size={26} color={color("text-primary")} />
                </Pressable>
                <Text
                  className="ml-1 text-3xl font-semibold"
                  style={{ color: color("text-primary") }}
                >
                  I am
                </Text>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Page padding */}
                <View className="px-5 pb-6">
                  {/* Promo banner */}
                  <View
                    className="rounded-3xl p-6 mb-6"
                    style={{ backgroundColor: color("promo-navy") }}
                  >
                    <View className="pr-16">
                      <Text className="text-white text-2xl font-bold mb-2">
                        Try I am Premium
                      </Text>
                      <Text className="text-white/90 text-base leading-6">
                        Access all categories, affirmations, themes, and remove ads!
                      </Text>
                    </View>
                    <View className="absolute right-6 top-6">
                      <Feather name="hexagon" size={32} color="white" />
                    </View>
                  </View>

                  {/* Streak card */}
                  <View className="bg-white rounded-3xl p-6 mb-6">
                    <View className="flex-row items-center justify-between mb-5">
                      <Text
                        className="text-xl font-semibold"
                        style={{ color: color("text-primary") }}
                      >
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
                        <Text
                          className="text-2xl font-semibold"
                          style={{ color: color("text-primary") }}
                        >
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
                            <Text
                              key={d}
                              className="text-xs font-medium"
                              style={{ color: color("icon-muted") }}
                            >
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
                    <Row
                      icon={<Feather name="settings" size={20} color={color("text-primary")} />}
                      title="Preferences"
                    />
                    <Divider />
                    <Row
                      icon={<Feather name="check-circle" size={20} color={color("text-primary")} />}
                      title="Topics you follow"
                    />
                    <Divider />
                    <Row
                      icon={
                        <View className="w-10 h-10 rounded-2xl items-center justify-center bg-[#F3A7A2]">
                          <Text className="text-xs font-medium" style={{ color: color("text-primary") }}>
                            I am
                          </Text>
                        </View>
                      }
                      title="App icon"
                    />
                    <Divider />
                    <Row icon={<Feather name="bell" size={20} color={color("text-primary")} />} title="Reminders" />
                    <Divider />
                    <Row icon={<Feather name="grid" size={20} color={color("text-primary")} />} title="Widgets" />
                    <Divider />
                    <Row
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

                {/* Bottom breathing room */}
                <View className="h-8" />
                {Platform.OS === "ios" && <View className="h-4" />}
              </ScrollView>
            </SafeAreaView>
          </Animated.View>
        </View>
      </View>
    </>
  );
}

/* Row component */
function Row({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Pressable className="px-6 py-4 flex-row items-center justify-between active:opacity-70">
      <View className="flex-row items-center flex-1">
        <View className="w-10 items-center justify-center mr-4">{icon}</View>
        <Text className="text-lg" style={{ color: color("text-primary") }}>
          {title}
        </Text>
      </View>
      <Feather name="chevron-right" size={22} color={color("icon-muted")} />
    </Pressable>
  );
}

function Divider() {
  return <View className="h-[1px] mx-6" style={{ backgroundColor: color("divider") }} />;
}
