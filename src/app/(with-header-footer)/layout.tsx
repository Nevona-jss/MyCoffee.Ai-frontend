import React from "react";
import BottomMenuBar from "@/components/BottomMenuBar";
import Header from "@/components/Header";


export default function LayoutHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="h-min-[100vh] bg-background flex flex-col">
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
