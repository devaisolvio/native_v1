import { Redirect } from "expo-router";

export default function Index() {
  const k = false; // change this logic later to read from storage

  if (!k) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/home" />;
// app/index.tsx
}
