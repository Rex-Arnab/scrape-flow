import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScrapeFlow",
  description: "Create workflows to build web scrapers",
  openGraph: {
    title: "ScrapeFlow",
    description: "Create workflows to build web scrapers",
    url: "https://yourdomain.com", // Replace with your actual domain URL
    siteName: "ScrapeFlow",
    images: [
      {
        url: "https://yourdomain.com/images/og-image.png", // Replace with your actual image URL
        width: 800,
        height: 600,
        alt: "ScrapeFlow Social Image"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrapeFlow",
    description: "Create workflows to build web scrapers",
    images: ["https://yourdomain.com/images/twitter-card.png"], // Replace with your actual image URL
    creator: "@yourTwitterHandle" // Replace with your Twitter handle or remove if not needed
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          afterSignOutUrl={"/sign-in"}
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-sm !shadow-none"
            }
          }}>
          <AppProviders>{children}</AppProviders>
        </ClerkProvider>
      </body>
      <Toaster richColors />
    </html>
  );
}
