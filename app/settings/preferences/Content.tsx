import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../../../theme/palette";

const KEY = "pref.topics";

type Topic = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

const TOPICS: Topic[] = [
  { key: "growth", label: "Personal growth", icon: <Feather name="coffee" size={20} color={color("text-primary")} /> },
  { key: "positive", label: "Positive thinking", icon: <MaterialCommunityIcons name="emoticon-happy-outline" size={20} color={color("text-primary")} /> },
  { key: "relationships", label: "Relationships", icon: <Feather name="heart" size={20} color={color("text-primary")} /> },
  { key: "happiness", label: "Happiness", icon: <Feather name="smile" size={20} color={color("text-primary")} /> },
  { key: "stress", label: "Stress & anxiety", icon: <Feather name="zap" size={20} color={color("text-primary")} /> },
  { key: "thankful", label: "Being thankful", icon: <Feather name="cloud" size={20} color={color("text-primary")} /> },
  { key: "selflove", label: "Loving myself", icon: <MaterialCommunityIcons name="hand-heart-outline" size={20} color={color("text-primary")} /> },
  { key: "body", label: "Loving my body", icon: <MaterialCommunityIcons name="human-male-height-variant" size={20} color={color("text-primary")} /> },
];

export default function ContentPreferences() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => {
      if (v) setSelected(JSON.parse(v));
    });
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(KEY, JSON.stringify(selected)).catch(() => {});
  }, [selected]);

  const toggle = (k: string) =>
    setSelected((cur) =>
      cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]
    );

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
          Select all topics that interest you
        </Text>

        {TOPICS.map((t) => (
          <TopicRow
            key={t.key}
            icon={t.icon}
            label={t.label}
            selected={selected.includes(t.key)}
            onPress={() => toggle(t.key)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function TopicRow({
  icon,
  label,
  selected,
  onPress,
}: {
  icon: React.ReactNode;
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
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View style={{ width: 40, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          {icon}
        </View>
        <Text style={{ fontSize: 18, color: color("text-primary") }}>{label}</Text>
      </View>

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
        {selected ? <Feather name="check" size={16} color="#fff" /> : null}
      </View>
    </Pressable>
  );
}
