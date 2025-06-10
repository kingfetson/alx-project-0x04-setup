import type { AppProps } from "next/app";
// import { CountProvider } from "@/pages/counter-app"; // Adjust import if you move CountContext to context/
// import { CountProvider } from "@/pages/counter-app"; // Uncomment and adjust if CountProvider is in counter-app
// import { CountProvider } from "@/context/CountContext"; // Update the path to where CountProvider is actually defined
// Please update the import path below to the actual location of CountProvider:
import { CountProvider } from "../pages/counter-app"; // Example: adjust this path as needed
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountProvider>
      <Component {...pageProps} />
    </CountProvider>
  );
}