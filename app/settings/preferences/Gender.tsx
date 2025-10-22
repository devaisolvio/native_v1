import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../../../theme/palette";

const KEY = "pref.gender";

const OPTIONS = ["Male", "Female", "Others", "Prefer not to say"] as const;
type Gender = (typeof OPTIONS)[number];

export default function GenderIdentity() {
  const [value, setValue] = useState<Gender>("Male");

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => {
      if (v && OPTIONS.includes(v as Gender)) setValue(v as Gender);
    });
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(KEY, value).catch(() => {});
  }, [value]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color("bg-sand-50") }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <Text
          style={{
            color: color("text-primary"),
            fontSize: 22,
            lineHeight: 30,
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          Your gender identity is used to personalize your content
        </Text>

        {OPTIONS.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={value === opt}
            onPress={() => setValue(opt)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function OptionCard({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: selected ? color("text-primary") + "33" : color("divider"),
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      android_ripple={{ color: "#00000010" }}
    >
      <Text style={{ fontSize: 18, color: color("text-primary") }}>{label}</Text>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected ? color("text-primary") : "transparent",
          borderWidth: selected ? 0 : 1,
          borderColor: color("divider"),
        }}
      >
        {selected ? (
          <Feather name="check" size={16} color="#fff" />
        ) : null}
      </View>
    </Pressable>
  );
}
