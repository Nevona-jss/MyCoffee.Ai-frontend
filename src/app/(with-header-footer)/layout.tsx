import React from "react";
import BottomMenuBar from "@/components/BottomMenuBar";
import Header from "@/components/Header";


export default function LayoutHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-[100vh] bg-background">
      {/* Header */}
      <Header />
      <div className="flex-1">
        {children}
      </div>

      {/* Bottom Menu Bar */}
      <BottomMenuBar />
    </div>
  );
}
