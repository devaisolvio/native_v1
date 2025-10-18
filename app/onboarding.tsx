import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { color } from "../theme/palette";

// Welcome Screen Component
function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const [imageOpacity] = useState(new Animated.Value(0));
  const [statOpacity] = useState(new Animated.Value(0));
  const [textOpacity] = useState(new Animated.Value(0));
  const [reviewOpacity] = useState(new Animated.Value(0));
  const [buttonOpacity] = useState(new Animated.Value(0));
  const [currentQuote, setCurrentQuote] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [viewWidth, setViewWidth] = useState(300);

  const quotes = [
    "Reading these every day puts my mind\nin a much better spot",
    "These affirmations changed my life\ncompletely for the better",
    "I feel more confident and positive\nevery single day",
    "A daily dose of motivation that\nactually works",
  ];

  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(statOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(textOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(reviewOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(buttonOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    // Auto-scroll quotes every 2 seconds
    const interval = setInterval(() => {
      setCurrentQuote((prev) => {
        const nextIndex = (prev + 1) % quotes.length;
        scrollViewRef.current?.scrollTo({ x: nextIndex * viewWidth, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [viewWidth]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="px-8">
      <View className="flex-1 justify-center items-center">
        {/* Hand illustration */}
        <Animated.View style={{ opacity: imageOpacity }} className="mb-8">
          <Text className="text-6xl text-center">🙏</Text>
        </Animated.View>

        {/* Stat */}
        <Animated.View style={{ opacity: statOpacity }} className="mb-6">
          <View className="flex-row items-center justify-center mb-2">
            <Text className="text-xl">🌿</Text>
            <Text className="text-text-primary text-3xl font-bold mx-3">+20 million</Text>
            <Text className="text-xl">🌿</Text>
          </View>
          <Text className="text-text-primary/70 text-lg text-center">Lives changed</Text>
        </Animated.View>

        {/* Main text */}
        <Animated.View style={{ opacity: textOpacity }} className="mb-8">
          <Text className="text-text-primary text-2xl text-center px-4">
            Transform your mindset with powerful affirmations
          </Text>
        </Animated.View>

        {/* Review with scrollable quotes */}
        <Animated.View style={{ opacity: reviewOpacity }} className="mb-12 items-center">
          <View className="flex-row justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Text key={star} className="text-yellow-500 text-xl mx-0.5">★</Text>
            ))}
          </View>
          <View
            onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
            style={{ width: '100%' }}
          >
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / viewWidth);
                setCurrentQuote(index);
              }}
            >
              {quotes.map((quote, index) => (
                <View key={index} style={{ width: viewWidth }}>
                  <Text className="text-text-primary/70 text-base text-center px-8">
                    {quote}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* Dots indicator */}
          <View className="flex-row justify-center mt-3">
            {quotes.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentQuote ? 'bg-text-primary' : 'bg-text-primary/30'
                }`}
              />
            ))}
          </View>
        </Animated.View>
      </View>

      {/* Get Started Button */}
      <Animated.View style={{ opacity: buttonOpacity }} className="pb-6">
        <TouchableOpacity
          onPress={onGetStarted}
          className="bg-btn-primary-text py-4 px-6 rounded-xl"
        >
          <Text className="text-white text-lg text-center font-semibold">Get started</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

// Questions array
const questions = [
  { question: "What's your gender?", title: "Choose From The Following", type: "options", options: ["Male", "Female", "Other"] },
  { question: "What's your name?", title: "Please enter your name", type: "input" },
  { question: "What's your personality?", title: "Choose From The Following", type: "options", options: ["Introvert", "Extrovert", "Ambivert"] },
  { question: "Your age range?", title: "Choose From The Following", type: "options", options: ["<18", "18-25", "25+"] },
  { question: "Do you like sports?", title: "Choose From The Following", type: "options", options: ["Yes", "No"] },
  { question: "Favorite food type?", title: "Choose From The Following", type: "options", options: ["Veg", "Non-veg"] },
  { question: "Preferred vacation type?", title: "Choose From The Following", type: "options", options: ["Mountains", "Beach", "City"] },
  { question: "Morning or night person?", title: "Choose From The Following", type: "options", options: ["Morning", "Night"] },
];

export default function Onboarding() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleAnswer = (option?: string) => {
    const answer = option ?? inputValue.trim();
    if (!answer) return;

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setInputValue("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      console.log("User answers:", newAnswers);
      router.replace("/home");
    }
  };

  return (
    <LinearGradient
      colors={[color("bg-mint-50"), color("bg-peach-200")]}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={{ flex: 1 }}
    >
      <Stack.Screen options={{ headerShown: false }} />

      {showWelcome ? (
        <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top}
        >
          <SafeAreaView style={{ flex: 1 }}>
            {/* Skip */}
            <View style={{ paddingTop: 10, paddingHorizontal: 32 }} className="flex-row justify-end mb-4">
              {questions[current].type !== "input" && (
                <TouchableOpacity 
                  onPress={() => handleAnswer("Skipped")} 
                  className="py-2 px-4"
                >
                  <Text style={{ color: color("text-primary") }}>
                    Skip
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Scrollable content */}
            <ScrollView
              className="flex-1 px-8"
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <Text className="text-text-primary text-center pb-4 text-4xl font-poppins-regular">
                {questions[current].question}
              </Text>
              <Text className="text-text-primary/80 text-center pb-8 text-xl">
                {questions[current].title}
              </Text>

              {questions[current].type === "input" && (
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder="Type here..."
                  placeholderTextColor="rgba(0,0,0,0.35)"
                  className="rounded-xl p-4 mb-6 bg-surface-overlay"
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.08)",
                    color: color("text-primary"),
                    height: 48,
                  }}
                  returnKeyType="done"
                  onSubmitEditing={() => handleAnswer()}
                />
              )}

              {questions[current].type === "options" &&
                questions[current].options?.map((option, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleAnswer(option)}
                    className="bg-btn-primary-bg py-4 px-6 rounded-xl mb-3"
                  >
                    <Text className="text-text-primary text-lg">{option}</Text>
                  </TouchableOpacity>
                ))}

              {/* spacer pushes footer to bottom; KAV will lift it when keyboard shows */}
              <View style={{ flex: 1 }} />
            </ScrollView>

            {/* Footer button (only for input step) */}
            {questions[current].type === "input" && (
              <View
                style={{
                  paddingHorizontal: 32,
                }}
                className="pb-0"
              >
                <TouchableOpacity
                  onPress={() => handleAnswer()}
                  className="py-4 px-6 rounded-xl bg-btn-primary-text"
                >
                  <Text className="text-white text-lg text-center">Next</Text>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </LinearGradient>
  );
}