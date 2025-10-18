import { Redirect } from "expo-router";

export default function Index() {
  const k = true; // change this logic later to read from storage


  return k ? <Redirect href="/onboarding"/> : <Redirect href="/home" />
// app/index.ts
}
