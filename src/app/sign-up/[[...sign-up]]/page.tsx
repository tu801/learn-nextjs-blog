"use client";
import { SignUp } from "@clerk/nextjs";
import { useThemeMode } from "flowbite-react";
import { dark } from "@clerk/themes";
import {
  DarkThemeVariables,
  DefaultThemeVariables,
} from "../../../types/clerk";

export default function Page() {
  const { mode } = useThemeMode();
  return (
    <div className="flex items-center justify-center p-3 mt-5">
      <SignUp
        appearance={{
          baseTheme: mode === "dark" ? dark : undefined,
          variables:
            mode === "dark" ? DarkThemeVariables : DefaultThemeVariables,
        }}
      />
    </div>
  );
}
