import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
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

// Helper function to get today's date
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Save last access date
const saveLastAccessDate = async () => {
  try {
    const today = getTodayDate();
    await AsyncStorage.setItem("lastAccessDate", today);
  } catch (error) {
    console.error("Error saving last access date:", error);
  }
};

// --- Welcome Screen Component (unchanged, minimal edits kept) ---
function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const [imageOpacity] = useState(new Animated.Value(0));
  const [statOpacity] = useState(new Animated.Value(0));
  const [textOpacity] = useState(new Animated.Value(0));
  const [reviewOpacity] = useState(new Animated.Value(0));
  const [buttonOpacity] = useState(new Animated.Value(0));
  const [currentQuote, setCurrentQuote] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [viewWidth, setViewWidth] = useState(Dimensions.get("window").width - 64);

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
        <Animated.View style={{ opacity: imageOpacity }} className="mb-8">
          <Text className="text-6xl text-center">🙏</Text>
        </Animated.View>

        <Animated.View style={{ opacity: statOpacity }} className="mb-6">
          <View className="flex-row items-center justify-center mb-2">
            <Text className="text-xl">🌿</Text>
            <Text className="text-text-primary text-3xl font-bold mx-3">+20 million</Text>
            <Text className="text-xl">🌿</Text>
          </View>
          <Text className="text-text-primary/70 text-lg text-center">Lives changed</Text>
        </Animated.View>

        <Animated.View style={{ opacity: textOpacity }} className="mb-8">
          <Text className="text-text-primary text-2xl text-center px-4">
            Transform your mindset with powerful affirmations
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: reviewOpacity }} className="mb-12 items-center">
          <View className="flex-row justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Text key={star} className="text-yellow-500 text-xl mx-0.5">★</Text>
            ))}
          </View>

          <View onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)} style={{ width: '100%' }}>
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

          <View className="flex-row justify-center mt-3">
            {quotes.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${ index === currentQuote ? 'bg-text-primary' : 'bg-text-primary/30' }`}
              />
            ))}
          </View>
        </Animated.View>
      </View>

      <Animated.View style={{ opacity: buttonOpacity }} className="pb-6">
        <TouchableOpacity onPress={onGetStarted} className="bg-btn-primary-text py-4 px-6 rounded-xl">
          <Text className="text-white text-lg text-center font-semibold">Get started</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

// --- Benefits Screen ---
function BenefitsScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <SafeAreaView style={{ flex: 1 }} className="px-8">
      <View className="flex-1 justify-center items-center">
        <View className="mb-16">
          <Text className="text-6xl text-center">🙏</Text>
        </View>

        <Text className="text-text-primary text-3xl text-center font-semibold mb-12 px-4 leading-10">
          The benefits of daily{'\n'}personalized affirmations
        </Text>

        <View className="w-full mb-16">
          <View className="flex-row items-center mb-6">
            <Ionicons name="radio-button-on-outline" size={24} color={color("text-primary")} />
            <Text className="text-text-primary text-lg ml-3">Focus on achieving your goals</Text>
          </View>
          <View className="flex-row items-center mb-6">
            <Ionicons name="person-outline" size={24} color={color("text-primary")} />
            <Text className="text-text-primary text-lg ml-3">Shift negative thoughts</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="happy-outline" size={24} color={color("text-primary")} />
            <Text className="text-text-primary text-lg ml-3">Improve mental health</Text>
          </View>
        </View>
      </View>

      <View className="pb-6">
        <TouchableOpacity onPress={onContinue} className="py-4 px-6 rounded-xl" style={{ backgroundColor: "#2C3E50" }}>
          <Text className="text-white text-lg text-center font-semibold">Got it!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Streak Habit Screen ---
function StreakHabitScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <SafeAreaView style={{ flex: 1 }} className="px-8">
      <View className="flex-1 justify-center items-center">
        <View className="mb-8 items-center">
          <Text className="text-6xl font-bold text-text-primary">1</Text>
          <View className="mt-4">
            <Text className="text-4xl text-text-primary/30">~</Text>
          </View>
        </View>

        <Text className="text-text-primary text-2xl text-center font-semibold mb-12 px-4">
          Build a daily affirmation habit{'\n'}that sticks
        </Text>

        <View
          className="bg-white rounded-3xl p-6 mb-16 w-full"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="flex-row justify-between mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <View key={day} className="items-center">
                <Text className="text-text-primary/50 text-xs mb-2">{day}</Text>
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: index === 0 ? '#FF6B9D' : '#E5E5EA' }}
                >
                  {index === 0 && <Ionicons name="checkmark" size={20} color="white" />}
                </View>
              </View>
            ))}
          </View>

          <Text className="text-text-primary/70 text-center text-base mt-2">
            Build a streak, one day at a time
          </Text>
        </View>
      </View>

      <View className="pb-6">
        <TouchableOpacity onPress={onContinue} className="py-4 px-6 rounded-xl" style={{ backgroundColor: "#2C3E50" }}>
          <Text className="text-white text-lg text-center font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Questions (your full list of 17 + added categories as 18th) ---
const questions = [
  { question: "How did you hear about -nameOfApp", title: "Select an option to continue", type: "options", options: ["TikTok", "Instagram", "Facebook", "Google Play", "Web search", "Friend/family", "Other"]},
  { question: "What do you want to be called?", title: "Your name will appear in your affirmations", type: "input" },
  { question: "Which option represents you best", title: "Some affirmations will use your gender or pronouns", type: "options", options: ["Female", "Male", "Others", "Prefer not to say"] },
  { question: "How old are you?", title: "Your age is used to personalize your content", type: "options", options: ["13 to 17", "18 to 24", "25 to 34", "35 to 44", "45 to 54", "55+"] },
  { question: "What's your Zodiac sign?", title: "This information will be used to personalize your affirmations", type: "options", options: ["Capricorn", "Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpia","Sagittarius"] },
  { question: "Are you religious?", title: "This information will be used to tailor your affirmations to your beliefs", type: "options", options: ["Yes", "No", "Spiritual but not religious"] },
  { question: "Which of these best describes your beliefs?", title: "This information will be used to personalize your affirmations", type: "options", options: ["Christianity", "Judaism", "Islam", "Hinduism","Buddhism","Other"] },
  { question: "Get affirmations that fit your relationship status", title: "Choose the option that describes it the best", type: "options", options: ["In a happy relationship", "It's complicated","Happily single","Single and open to connection","It's complicated","Not interested in this topic"] },
  { question: "How familiar are you with affirmations?", title: "Your experience will be adjusted according to your answer", type: "options", options: ["This is new for me", "I've used them occasionally","I use them regularly"] },
  { type: "benefits" }, // 10th screen - Benefits screen
  { question: "How much time will you devote to affirmations?", title: "You can change your goal later", type: "options", options: ["1 minute a day", "3 minutes a day","10 minutes a day"] },
  { type: "streak" }, // 12th screen - Streak Habit screen
  { question: "How have you been feeling lately?", title: "Choose a mood to personalize your content", type: "options", options: ["Awesome", "Good","Neutral","Bad","Terrible","Other"] },
  { question: "What's making you feel that way?", title: "You can select more than one option", type: "options", options: ["Family", "Friends","Work","Health","Love","Other"] },
  { question: "What do you want to improve?", title: "Choose at least one to tailor your content so it resonates with you", type: "options", options: ["Personal growth", "Positive thinking","Relationships","Happiness","Stress & anxiety","Being thankful","Loving myself","Loving my body"] },
  { question: "What are your goals right now?", title: "The more you share, the more personalized your affirmations will be", type: "input" },
  { question: "What do you want to achieve with i am?", title: "Choose at least one to see affirmations based on your goals", type: "options", options: ["Develop a positive mindset", "Feel more self-confident","Learn to love myself","Personal growth","Improve my mental health","Be more present and enjoy life"] },
  // 18th screen - categories (screenshot)
  {
    question: "Which categories are you interested in?",
    title: "This will be used to personalize your feed",
    type: "categories",
    options: [
      "Self-talk", "Overthinking", "Anxiety",
      "Confidence", "Dream big", "Purpose",
      "Morning", "Inner child", "Self-love",
      "Attraction", "Feeling sassy",
      "Romance", "Gratitude", "Positivity"
    ],
  },
  {
    type: "freeTrial",
    question: "We offer 3 days for free so everyone can feel the power of affirmations"
  }
];

// --- Main Onboarding component ---
export default function Onboarding() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Save last access date when component mounts
  useEffect(() => {
    saveLastAccessDate();
  }, []);

  // centralised next logic
  const goToNextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // finished onboarding
      console.log("User answers:", answers);
      router.replace("/home");
    }
  };

  // Generic answer handler used for options, multi-select, categories & inputs
  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = answer;
    setAnswers(newAnswers);
    setInputValue("");
    goToNextQuestion();
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
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
      ) : questions[current].type === "benefits" ? (
        <BenefitsScreen onContinue={() => goToNextQuestion()} />
      ) : questions[current].type === "streak" ? (
        <StreakHabitScreen onContinue={() => goToNextQuestion()} />
      ) : questions[current].type === "categories" ? (
        // --- Categories screen (screenshot) ---
        <SafeAreaView style={{ flex: 1 }} className="px-8">
          <View style={{ paddingTop: 10, paddingHorizontal: 32 }} className="flex-row justify-end mb-4">
            <TouchableOpacity onPress={() => handleAnswer("Skipped")} className="py-2 px-4">
              <Text style={{ color: color("text-primary") }}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-start">
            <Text className="text-text-primary text-center pb-4 text-3xl font-semibold">
              {questions[current].question}
            </Text>
            <Text className="text-text-primary/70 text-center pb-6 text-lg">
              {questions[current].title}
            </Text>

            <View className="flex-row flex-wrap justify-center">
              {questions[current].options?.map((option, idx) => {
                const isSelected = selectedCategories.includes(option);
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => toggleCategory(option)}
                    className={`border rounded-full px-5 py-2 m-1`}
                    style={{
                      backgroundColor: isSelected ? color("btn-primary-text") : "white",
                      borderColor: isSelected ? color("btn-primary-text") : "rgba(0,0,0,0.08)",
                    }}
                  >
                    <Text style={{ color: isSelected ? "white" : color("text-primary") }}>
                      + {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View className="pb-8" style={{ paddingHorizontal: 32 }}>
            <TouchableOpacity
              disabled={selectedCategories.length === 0}
              onPress={() => {
                handleAnswer(selectedCategories.join(", "));
                setSelectedCategories([]);
              }}
              className="py-4 px-6 rounded-xl"
              style={{
                backgroundColor: selectedCategories.length === 0 ? "rgba(44,62,80,0.45)" : color("btn-primary-text"),
              }}
            >
              <Text className="text-white text-lg text-center font-semibold">Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        // --- Generic question renderer (options / input / etc) ---
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top}
        >
          <SafeAreaView style={{ flex: 1 }}>
            {/* Skip */}
            <View style={{ paddingTop: 10, paddingHorizontal: 32 }} className="flex-row justify-end mb-4">
              {questions[current].type !== "input" && (
                <TouchableOpacity onPress={() => handleAnswer("Skipped")} className="py-2 px-4">
                  <Text style={{ color: color("text-primary") }}>Skip</Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView className="flex-1 px-8" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
                  onSubmitEditing={() => { if (inputValue.trim()) handleAnswer(inputValue.trim()); }}
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

              <View style={{ flex: 1 }} />
            </ScrollView>

            {/* Footer button (only for input step) */}
            {questions[current].type === "input" && (
              <View style={{ paddingHorizontal: 32 }} className="pb-0">
                <TouchableOpacity
                  onPress={() => { if (inputValue.trim()) handleAnswer(inputValue.trim()); }}
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
