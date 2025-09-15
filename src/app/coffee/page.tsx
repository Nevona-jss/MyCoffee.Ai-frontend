"use client";
import React, { useState } from "react";
import Tabs from "@/components/Tabs";

const tabs = [
  { id: 1, label: "커피 취향 분석", value: "taste-analysis" },
  { id: 2, label: "내 커피 컬렉션", value: "my-coffee-collection" },
  { id: 3, label: "이달의 커피", value: "monthly-coffee" },
];

const page = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab || tabs[0].value}
        onTabChange={(tab) => setActiveTab(tab)}
      />
    </div>
  );
};

export default page;
