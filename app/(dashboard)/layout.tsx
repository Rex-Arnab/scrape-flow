import BreadcrumbHeader from "@/components/BreadcrumbHeader"
import DesktopSidebar from "@/components/Sidebar"
import { ModeToggle } from "@/components/ThemeModeToggle"
import { Separator } from "@/components/ui/separator"
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col min-h-screen w-full">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumbHeader />
          <div className="gap-2 flex items-center">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout