// app/index.tsx
import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons, Feather } from "@expo/vector-icons";

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

  const quote = useMemo(() => QUOTES[index % QUOTES.length], [index]);

  const showNext = useCallback(() => {
    opacity.value = withTiming(0, { duration: 160 }, () => {
      runOnJS(setIndex)((p) => (p + 1) % QUOTES.length);
      opacity.value = withTiming(1, { duration: 180 });
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: withTiming(opacity.value === 1 ? 0 : 8, { duration: 160 }) }],
  }));

  // Reliable swipe-up (and tap) gestures
  const swipeUp = Gesture.Pan()
    .hitSlop({ top: 24, left: 24, right: 24, bottom: 80 }) // avoid OS edge areas
    .minDistance(20)
    .activeOffsetY([-20, 9999]) // activate when user moves up ≥ 20px
    .onEnd((e) => {
      const wentUpEnough = e.translationY < -30;
      const fastEnough = Math.abs(e.velocityY) > 400;
      if (wentUpEnough || fastEnough) {
        showNext();
      }
    });

  const tap = Gesture.Tap().numberOfTaps(1).onEnd(() => showNext());

  const gestures = Gesture.Simultaneous(swipeUp, tap);

  return (
    <GestureDetector gesture={gestures}>
      <View className="flex-1">
        <LinearGradient
          colors={["#E9F3EE", "#F6D7CF"]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.7, y: 1 }}
          style={{ flex: 1 }}
        >
          <SafeAreaView className="flex-1">
            {/* Top bar */}
            <View className="px-4 pt-2 flex-row items-center justify-between">
              <Pressable className="w-12 h-12 bg-white/70 rounded-2xl items-center justify-center">
                <Ionicons name="person-outline" size={22} />
              </Pressable>

              <View className="flex-row items-center space-x-3">
                <Feather name="instagram" size={18} />
                <Feather name="facebook" size={18} />
                <Feather name="youtube" size={18} />
                <Feather name="circle" size={6} />
              </View>

              <Pressable className="w-12 h-12 bg-white/70 rounded-2xl items-center justify-center">
                {/* simple, widely available icon to avoid pack-name issues */}
                <Feather name="star" size={20} />
              </Pressable>
            </View>

            {/* Center quote */}
            <View className="flex-1 items-center justify-center px-6">
              <Animated.Text
                style={animatedStyle as any}
                className="text-center text-2xl leading-9 text-neutral-700 font-semibold"
              >
                {quote}
              </Animated.Text>
            </View>

            {/* Bottom actions */}
            <View className="items-center pb-10">
              <View className="flex-row items-center space-x-10 mb-6">
                <Pressable className="p-3">
                  <Feather name="share-2" size={28} />
                </Pressable>
                <Pressable className="p-3">
                  <Feather name="heart" size={28} />
                </Pressable>
              </View>

              <View className="flex-row items-center justify-between w-full px-6">
                <Pressable className="w-16 h-16 bg-white/70 rounded-2xl items-center justify-center">
                  <Feather name="grid" size={22} />
                </Pressable>

                <Pressable className="px-5 py-3 bg-white rounded-2xl flex-row items-center">
                  <Ionicons name="person-circle-outline" size={20} />
                  <Text className="ml-2 text-base font-medium">Practice</Text>
                </Pressable>

                <Pressable className="w-16 h-16 bg-white/70 rounded-2xl items-center justify-center">
                  <Feather name="sliders" size={22} />
                </Pressable>
              </View>

              <Text className="mt-6 text-xs text-neutral-500">
                Swipe up anywhere (or tap) to see the next affirmation
              </Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </GestureDetector>
  );
}
