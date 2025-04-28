// layout.tsx
import React from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import AppHeader from "@/components/NavigationHeader/AppHeader";
import { SidebarProvider } from "@/components/Context/SidebarContext"; // Make sure path is correct
import { ThemeProvider } from "@/components/Context/ThemeContext"; // Optional: for theme context

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-gray-500 dark:bg-gray-dark">
          {/* App Header */}
          <AppHeader />
          <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
