"use client";
import React from "react";
import Tabs from "@/components/Tabs";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { id: 1, label: "커피 취향 분석", value: "taste-analysis" },
  { id: 2, label: "내 커피 컬렉션", value: "collection" },
  { id: 3, label: "이달의 커피", value: "monthly-coffee" },
];

export default function MyCoffeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Get current tab from pathname
  const getCurrentTab = () => {
    if (pathname.includes('taste-analysis')) return 'taste-analysis';
    if (pathname.includes('collection')) return 'collection';
    if (pathname.includes('monthly-coffee')) return 'monthly-coffee';
    return 'taste-analysis'; // default
  };

  const handleTabChange = (tab: string) => {
    router.push(`/my-coffee/${tab}`);
  };

  return (
    <div>
      <div className="bg-background mt-4">
        <Tabs
          tabs={tabs}
          activeTab={getCurrentTab()}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
