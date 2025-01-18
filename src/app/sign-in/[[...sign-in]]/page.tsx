"use client";
import { SignIn } from "@clerk/nextjs";
import { useThemeMode } from "flowbite-react";
import { dark } from "@clerk/themes";

export default function Page() {
  const { mode } = useThemeMode();
  return (
    <div className="flex items-center justify-center p-3 mt-5">
      <SignIn appearance={{ baseTheme: mode === "dark" ? dark : undefined }} />
    </div>
  );
}
