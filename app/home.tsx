import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, Platform, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import SettingsModel from "@/components/SettingsModel";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons, Feather } from "@expo/vector-icons";
import { color } from "../theme/palette";

const QUOTES = [
  "I trust the wisdom of my body.",
  "I meet myself where I am, with kindness.",
  "Every breath softens and steadies me.",
  "I choose to move gently through today.",
  "My presence is enough.",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const opacity = useSharedValue(1);
  const [showModal, setShowModal] = useState(false);
  const quote = useMemo(() => QUOTES[index % QUOTES.length], [index]);

  const updateIndex = useCallback(() => {
    setIndex((p) => (p + 1) % QUOTES.length);
  }, []);

  const showNext = useCallback(() => {
    opacity.value = withTiming(0, { duration: 160 }, () => {
      runOnJS(updateIndex)();
      opacity.value = withTiming(1, { duration: 180 });
    });
  }, [updateIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: withTiming(opacity.value === 1 ? 0 : 8, { duration: 160 }) }],
  }));

  const { height } = Dimensions.get("window");
  const BOTTOM_SAFE_ZONE = Platform.OS === "ios" ? 150 : 120;

  const swipeUp = Gesture.Pan()
    .minDistance(30)
    .activeOffsetY([-30, 9999])
    .failOffsetX([-50, 50])
    .onStart((e) => {
      const startY = e.absoluteY;
      if (startY > height - BOTTOM_SAFE_ZONE) return;
    })
    .onEnd((e) => {
      const startY = e.absoluteY - e.translationY;
      if (startY > height - BOTTOM_SAFE_ZONE) return;

      const wentUpEnough = e.translationY < -40;
      const fastUp = e.velocityY < -500;
      if (wentUpEnough || fastUp) runOnJS(showNext)();
    });

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => runOnJS(showNext)());

  const gestures = Gesture.Race(swipeUp, tap);

  return (
    <GestureDetector gesture={gestures}>
      <View className="flex-1 ">
        <LinearGradient
          colors={[color("bg-mint-50"), color("bg-peach-200")]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.7, y: 1 }}
          style={{ flex: 1 }}
        >
          <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
            {/* Top bar */}
            <View className="px-4 pt-2 flex-row items-center justify-between">
              <Pressable 
              onPress={()=>setShowModal(true)}
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={{ backgroundColor: color("surface-overlay") }}
              >
                <Ionicons name="person-outline" size={22} color={color("btn-ghost-icon")} />
              </Pressable>

              <View className="flex-row items-center">
                <Feather name="instagram" size={18} color={color("text-primary")} />
                <View className="w-3" />
                <Feather name="facebook" size={18} color={color("text-primary")} />
                <View className="w-3" />
                <Feather name="youtube" size={18} color={color("text-primary")} />
                <View className="w-3" />
                <Feather name="circle" size={6} color={color("text-primary")} />
              </View>

              <Pressable 
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={{ backgroundColor: color("btn-ghost-bg") }}
              >
                <Feather name="star" size={20} color={color("btn-ghost-icon")} />
              </Pressable>
            </View>

            {/* Center quote */}
            <View className="flex-1 items-center justify-center px-6">
              <Animated.Text
                style={[
                  animatedStyle,
                  { color: color("text-primary") }
                ] as any}
                className="text-center text-2xl leading-9 font-semibold"
              >
                {quote}
              </Animated.Text>
            </View>

            {/* Bottom actions */}
            <View className="items-center pb-6">
              <View className="flex-row items-center mb-6">
                <Pressable className="p-3">
                  <Feather name="share-2" size={28} color={color("text-primary")} />
                </Pressable>
                <View className="w-10" />
                <Pressable className="p-3">
                  <Feather name="heart" size={28} color={color("text-primary")} />
                </Pressable>
              </View>

              <View className="flex-row items-center justify-between w-full px-6 mb-4">
                <Pressable 
                  className="w-16 h-16 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: color("btn-ghost-bg") }}
                >
                  <Feather name="grid" size={22} color={color("btn-ghost-icon")} />
                </Pressable>

                <Pressable 
                  className="px-5 py-3 rounded-2xl flex-row items-center"
                  style={{ backgroundColor: color("btn-primary-bg") }}
                >
                  <Ionicons name="person-circle-outline" size={20} color={color("btn-primary-text")} />
                  <Text className="ml-2 text-base font-medium" style={{ color: color("btn-primary-text") }}>
                    Practice
                  </Text>
                </Pressable>

                <Pressable 
                  className="w-16 h-16 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: color("btn-ghost-bg") }}
                >
                  <Feather name="sliders" size={22} color={color("btn-ghost-icon")} />
                </Pressable>
              </View>

              <Text className="mt-2 text-xs text-center px-6" style={{ color: color("text-muted") }}>
                Swipe up in the center area (or tap anywhere) for next affirmation
              </Text>
            </View>
          </SafeAreaView>

          <SettingsModel  visible={showModal} onClose={()=>setShowModal(false)}/>
        </LinearGradient>
      </View>
    </GestureDetector>
  );
}