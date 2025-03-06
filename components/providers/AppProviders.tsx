"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function AppProviders({
  children
}: Readonly<{
    children: React.ReactNode;
    }>) {
  return <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>{children}</NextThemesProvider>;
}
