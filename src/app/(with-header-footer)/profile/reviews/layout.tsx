"use client";
import React, { useEffect } from "react";
import Tabs from "@/components/Tabs";
import { usePathname, useRouter } from "next/navigation";
import { useHeaderStore } from "@/stores/header-store";

const tabs = [
  { id: 1, label: "리뷰작성 (5)", value: "write-review" },
  { id: 2, label: "리뷰내역 (10)", value: "history" },
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
    if (pathname.includes('write-review')) return 'write-review';
    if (pathname.includes('collection')) return 'collection';
    if (pathname.includes('history')) return 'history';
    return 'history'; // default
  };

  const handleTabChange = (tab: string) => {
    router.push(`/profile/reviews/${tab}`);
  };

  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "내 리뷰"
    });
  }, []);

  return (
    <div>
      <div className="bg-background mt-4 px-4">
        <Tabs
          tabs={tabs}
          activeTab={getCurrentTab()}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}
