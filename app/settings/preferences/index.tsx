// app/settings/preferences/index.tsx
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, type Href } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "../../../theme/palette";
import { LinearGradient } from "expo-linear-gradient";

const PAGE_HPAD = 20; // horizontal page padding to match design

export default function PreferencesHome() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"rgba(255, 218, 185, 0.25)"}}>
  
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36, paddingTop: 8 }}
      >
        {/* PREMIUM */}
        <Section title="PREMIUM">
          <Card>
            <Row
              icon={<MaterialCommunityIcons name="diamond-outline" size={20} color={color("text-primary")} />}
              title="Manage subscription"
              href={"/settings/preferences/manage-subscription" as Href}
            />
          </Card>
        </Section>

        {/* MAKE IT YOURS */}
        <Section title="MAKE IT YOURS">
          <Card>
            <Row
              icon={<Feather name="align-left" size={20} color={color("text-primary")} />}
              title="Content preferences"
              href={"/settings/preferences/Content" as Href}
            />
            <Divider />
            <Row
              icon={<Ionicons name="male-female-outline" size={20} color={color("text-primary")} />}
              title="Gender identity"
              href={"/settings/preferences/Gender" as Href}
            />
            <Divider />
          {/*   <Row
              icon={<Feather name="volume-x" size={20} color={color("text-primary")} />}
              title="Muted content"
              href={"/settings/preferences/muted" as Href}
            />
            <Divider /> */}
            <Row
              icon={<Feather name="user" size={20} color={color("text-primary")} />}
              title="Name"
              href={"/settings/preferences/name" as Href}
            />
            <Divider />
            <Row
              icon={<Feather name="globe" size={20} color={color("text-primary")} />}
              title="Language"
              href={"/settings/preferences/language" as Href}
            />
            <Divider />
            <Row
              icon={<Feather name="volume-2" size={20} color={color("text-primary")} />}
              title="Sound"
              href={"/settings/preferences/sound" as Href}
            />
          </Card>
        </Section>

        {/* ACCOUNT */}
        <Section title="ACCOUNT">
          <Card>
            <Row
              icon={<Feather name="log-in" size={20} color={color("text-primary")} />}
              title="Sign in"
              href={"/settings/preferences/signin" as Href}
            />
          </Card>
        </Section>

        {/* SUPPORT US */}
        <Section title="SUPPORT US">
          <Card>
            <Row
              icon={<Feather name="share" size={20} color={color("text-primary")} />}
              title="Share I am"
              href={"/settings/preferences/share" as Href}
            />
            <Divider />
            {/* If you add "More by Monkey Taps", put it here with a monkey icon */}
            <Row
              icon={<Feather name="star" size={20} color={color("text-primary")} />}
              title="Leave us a review"
              href={"/settings/preferences/review" as Href}
            />
            <Divider />
         
          </Card>
        </Section>

        {/* HELP */}
        <Section title="HELP">
          <Card>
            <Row
              icon={<Feather name="help-circle" size={20} color={color("text-primary")} />}
              title="Help"
              href={"/settings/preferences/help" as Href}
            />
          </Card>
        </Section>

        {/* FOLLOW US */}
        <Section title="FOLLOW US">
          <Card>
            <Row
  icon={<MaterialCommunityIcons name="instagram" size={20} color={color("text-primary")} />}
  title="Instagram"
  href={"https://instagram.com/your_handle" as Href}
/>
<Divider />
<Row
  icon={<MaterialCommunityIcons name="facebook" size={20} color={color("text-primary")} />}
  title="Facebook"
  href={"https://facebook.com/your_page" as Href}
/>
          </Card>
        </Section>

        {/* OTHER */}
        <Section title="OTHER">
          <Card>
            <Row
              icon={<Feather name="file-text" size={20} color={color("text-primary")} />}
              title="Privacy Policy"
              href={"/settings/preferences/Privacy" as Href}

            />
            <Divider/>
            
            <Row
              icon={<Feather name="file-text" size={20} color={color("text-primary")} />}
              title="Terms & Condition"
              href={"/settings/preferences/Terms" as Href}
            />
          </Card>
         
        
        </Section>
      </ScrollView>
     
    </SafeAreaView>
  );
}

/* ---------- Reusable UI bits ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text
        style={{
          marginLeft: PAGE_HPAD,
          marginBottom: 10,
          fontSize: 12,
          fontWeight: "800",
          letterSpacing: 1,
          color: color("text-primary"),
        }}
      >
        {title}
      </Text>
      <View style={{ paddingHorizontal: PAGE_HPAD }}>{children}</View>
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 24, // rounded-3xl look
        overflow: "hidden",
        // optional subtle shadow (iOS)
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        // optional elevation (Android)
        elevation: 0,
      }}
    >
      {children}
    </View>
  );
}

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
      <Pressable
        style={{
          paddingHorizontal: 16,
          paddingVertical: 14, // ~56–60px row height with content
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        android_ripple={{ color: "#00000010" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <View style={{ width: 40, alignItems: "center", justifyContent: "center", marginRight: 16 }}>
            {icon}
          </View>
          <Text style={{ fontSize: 18, color: color("text-primary") }}>{title}</Text>
        </View>
        <Feather name="chevron-right" size={20} color={color("icon-muted")} />
      </Pressable>
    </Link>
  );
}

function Divider() {
  return (
    <View style={{ height: 1, marginHorizontal: 16, backgroundColor: color("divider") }} />
  );
}
