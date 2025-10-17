import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const questions = [
  { question: "What's your gender?", title: "Choose From The Following", options: ["Male", "Female", "Other"] },
  { question: "What's your personality?", title: "Choose From The Following", options: ["Introvert", "Extrovert", "Ambivert"] },
  { question: "Your age range?", title: "Choose From The Following", options: ["<18", "18-25", "25+"] },
  { question: "Do you like sports?", title: "Choose From The Following", options: ["Yes", "No"] },
  { question: "Favorite food type?", title: "Choose From The Following", options: ["Veg", "Non-veg"] },
  { question: "Preferred vacation type?", title: "Choose From The Following", options: ["Mountains", "Beach", "City"] },
  { question: "Morning or night person?", title: "Choose From The Following", options: ["Morning", "Night"] },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      console.log("User answers:", newAnswers);
      router.replace("/home");
    }
  };

  return (
    <>
      {/* hide header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* SafeAreaView ensures it’s not blocked by notch/status bar */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        {/* Top row for Skip button */}
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingTop: 10, // safe distance from notch/status bar
                paddingRight: 10, // padding from the right edge
            }}
        > 
        <TouchableOpacity onPress={() => router.replace("/home")}>
            <Text style={{ color: "#2563EB", fontSize: 16 }}>Skip</Text>
        </TouchableOpacity>
        </View>

        {/* Put everything in a top-aligned container */}
        <View style={{ marginTop: 70 }}>
          {/* Question */}
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 18,
              textAlign: "center",
            }}
          >
            {questions[current].question}
          </Text>

          {/* Title below question */}
          <Text
            style={{
              fontSize: 18,
              color: "#555",
              marginBottom: 30,
              textAlign: "center",
            }}
          >
            {questions[current].title}
          </Text>

          {/* Options */}
          {questions[current].options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleAnswer(option)}
              style={{
                backgroundColor: "#2563EB",
                paddingVertical: 18,
                paddingHorizontal: 25,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}
