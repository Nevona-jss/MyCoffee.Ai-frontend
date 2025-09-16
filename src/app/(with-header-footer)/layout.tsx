import React from "react";
import BottomMenuBar from "@/components/BottomMenuBar";
import Header from "@/components/Header";


export default function LayoutHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="h-[100dvh] bg-background">
      {/* Header */}
      <Header title="내 커피" showBackButton={false} />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Bottom Menu Bar */}
      <BottomMenuBar />
    </div>
  );
}
