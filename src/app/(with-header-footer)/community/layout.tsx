"use client";
import React from "react";
import Tabs from "@/components/Tabs";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { id: 1, label: "커피스토리", value: "coffee-story-main" },
  { id: 2, label: "이벤트", value: "event-main" },
  { id: 3, label: "커피 꿀팁", value: "coffee-tip-main" },
];

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Get current tab from pathname
  const getCurrentTab = () => {
    if (pathname.includes("coffee-story-main")) return "coffee-story-main";
    if (pathname.includes("event-main")) return "event-main";
    if (pathname.includes("coffee-tip-main")) return "coffee-tip-main";
    return "coffee-story-main"; // default
  }; 

  const handleTabChange = (tab: string) => {
    router.push(`/community/${tab}`);
  };

  return (
    <div className="w-full">
      <div className="bg-background mt-4 px-4">
        <Tabs
          tabs={tabs}
          activeTab={getCurrentTab()}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
