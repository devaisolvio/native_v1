import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../../theme/palette";

/* ------------------------ Config ------------------------ */

const STORAGE_KEY = "topics.followed.v2";
const PAGE_PAD = 20;

type Topic = { id: string; title: string; premium?: boolean };

const GENERAL = [
  { id: "general", title: "General" },
  { id: "favorites", title: "My favorites" },
  { id: "mine", title: "My own affirmations" },
  { id: "history", title: "History" },
];

const SECTIONS: { key: string; title: string; items: Topic[] }[] = [
  {
    key: "popular",
    title: "Most popular",
    items: [
      { id: "morning", title: "Morning routine" },
      { id: "october", title: "October affirmations", premium: true },
      { id: "abundance", title: "Manifest abundance" },
      { id: "silence-doubt", title: "Silence self-doubt", premium: true },
      { id: "couple", title: "Grow as a couple", premium: true },
      { id: "stress-anxiety", title: "Control stress and anxiety" },
      { id: "christianity", title: "Practice Christianity", premium: true },
      { id: "confident", title: "Be confident" },
      { id: "overthinking", title: "Stop overthinking", premium: true },
      { id: "fall-in-love", title: "Fall in love", premium: true },
    ],
  },
  {
    key: "bright",
    title: "Look on the bright side",
    items: [
      { id: "loa", title: "Law of attraction", premium: true },
      { id: "find-happiness", title: "Find your happiness", premium: true },
      { id: "think-positive", title: "Think positive", premium: true },
      { id: "blessed", title: "Feel blessed", premium: true },
      { id: "gratitude", title: "Practice gratitude", premium: true },
      { id: "enjoy", title: "Enjoy the moment", premium: true },
    ],
  },
];

/* ----------------------------- Screen ------------------------------ */

export default function TopicsYouFollow() {
  const [query, setQuery] = useState("");
  const [followed, setFollowed] = useState<string[]>([]);
  const [isPremium] = useState(false); // hook up your real flag

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => v && setFollowed(JSON.parse(v)));
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(followed)).catch(() => {});
  }, [followed]);

  const filtered = useMemo(() => {
    if (!query.trim()) return SECTIONS;
    const q = query.toLowerCase();
    return SECTIONS.map((s) => ({
      ...s,
      items: s.items.filter((t) => t.title.toLowerCase().includes(q)),
    })).filter((s) => s.items.length);
  }, [query]);

  const toggle = (id: string) =>
    setFollowed((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const followAll = (items: Topic[]) => {
    const ids = items.filter((t) => (t.premium ? isPremium : true)).map((t) => t.id);
    setFollowed((cur) => Array.from(new Set([...cur, ...ids])));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color("bg-sand-50") }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
        {/* Search */}
        <View style={{ paddingHorizontal: PAGE_PAD, marginTop: 8, marginBottom: 12 }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: color("divider"),
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              height: 48,
            }}
          >
            <Feather name="search" size={18} color={color("icon-muted")} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={color("icon-muted")}
              value={query}
              onChangeText={setQuery}
              style={{ marginLeft: 8, flex: 1, color: color("text-primary"), fontSize: 18 }}
            />
          </View>
        </View>

        {/* General card */}
        <Card>
          {GENERAL.map((g, i) => {
            const on = followed.includes(g.id);
            return (
              <Row key={g.id} showDivider={i !== GENERAL.length - 1}>
                <RowTitle text={g.title} />
                <Pressable onPress={() => toggle(g.id)} hitSlop={8}>
                  {on ? <FollowingPill /> : <FollowOutline />}
                </Pressable>
              </Row>
            );
          })}
        </Card>

        {/* Sections */}
        {filtered.map((sec) => (
          <View key={sec.key} style={{ marginTop: 6 }}>
            <SectionHeader title={sec.title} onAction={() => followAll(sec.items)} />
            <Card>
              {sec.items.map((t, i) => {
                const locked = !!t.premium && !isPremium;
                const on = followed.includes(t.id);
                return (
                  <Row key={t.id} showDivider={i !== sec.items.length - 1}>
                    <RowTitle text={t.title} muted={locked} />
                    {locked ? (
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={16}
                        color={color("icon-muted")}
                        style={{ marginRight: 10 }}
                      />
                    ) : null}
                    <Pressable onPress={() => !locked && toggle(t.id)} disabled={locked} hitSlop={8}>
                      {on ? <FollowingPill /> : <FollowOutline disabled={locked} />}
                    </Pressable>
                  </Row>
                );
              })}
            </Card>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* --------------------------- UI pieces --------------------------- */

function SectionHeader({ title, onAction }: { title: string; onAction?: () => void }) {
  return (
    <View
      style={{
        paddingHorizontal: PAGE_PAD,
        marginTop: 12,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "800", color: color("text-primary") }}>{title}</Text>
      {onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={{ fontSize: 16, fontWeight: "800", color: color("text-primary") }}>
            Follow all
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ paddingHorizontal: PAGE_PAD, marginBottom: 18 }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 22,
          overflow: "hidden",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: "#EEEFF1",
        }}
      >
        {children}
      </View>
    </View>
  );
}

function Row({ children, showDivider }: { children: React.ReactNode; showDivider?: boolean }) {
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }}>
        {children}
      </View>
      {showDivider ? <View style={{ height: 1, backgroundColor: color("divider") }} /> : null}
    </>
  );
}

function RowTitle({ text, muted }: { text: string; muted?: boolean }) {
  return (
    <Text
      numberOfLines={1}
      style={{
        flex: 1,
        fontSize: 18,
        color: muted ? color("icon-muted") : color("text-primary"),
      }}
    >
      {text}
    </Text>
  );
}

/* Pills */
function FollowingPill() {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: "#E6EAF2", // soft grey fill
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "700", color: color("text-primary") }}>
        Following
      </Text>
    </View>
  );
}

function FollowOutline({ disabled }: { disabled?: boolean }) {
  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: disabled ? "#C9CED6" : color("text-primary"),
        backgroundColor: "transparent",
        opacity: disabled ? 0.6 : 1,
        minWidth: 96,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "800", color: color("text-primary") }}>Follow</Text>
    </View>
  );
}
