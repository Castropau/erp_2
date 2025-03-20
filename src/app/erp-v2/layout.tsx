import React from "react";

/** components */
import Sidebar from "@/components/Sidebar/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
