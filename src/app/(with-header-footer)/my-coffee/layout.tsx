"use client";
import React, { useEffect, useState, useRef } from "react";
import Tabs from "@/components/Tabs";
import { usePathname, useRouter } from "next/navigation";
import { useHeaderStore } from "@/stores/header-store";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// Dynamically import the tab components to avoid SSR issues
const TasteAnalysis = dynamic(() => import("./taste-analysis/page"), { ssr: false });
const Collection = dynamic(() => import("./collection/page"), { ssr: false });
const MonthlyCoffee = dynamic(() => import("./monthly-coffee/page"), { ssr: false });

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
  const [currentTab, setCurrentTab] = useState('taste-analysis');
  const [swiper, setSwiper] = useState<any>(null);
  
  // Get current tab from pathname
  const getCurrentTab = () => {
    if (pathname.includes('taste-analysis')) return 'taste-analysis';
    if (pathname.includes('collection')) return 'collection';
    if (pathname.includes('monthly-coffee')) return 'monthly-coffee';
    return 'taste-analysis'; // default
  };

  // Get the index of current tab
  const getTabIndex = (tab: string) => {
    return tabs.findIndex(t => t.value === tab);
  };

  // Update current tab when pathname changes
  useEffect(() => {
    const tabFromPath = getCurrentTab();
    if (tabFromPath !== currentTab) {
      setCurrentTab(tabFromPath);
      // Update swiper slide when pathname changes
      if (swiper) {
        const index = getTabIndex(tabFromPath);
        swiper.slideTo(index);
      }
    }
  }, [pathname, swiper]);

  const handleTabChange = (tab: string) => {
    if (tab === currentTab) return;
    
    setCurrentTab(tab);
    
    // Update URL without triggering navigation
    window.history.pushState(null, '', `/my-coffee/${tab}`);
    
    // Update swiper slide
    if (swiper) {
      const index = getTabIndex(tab);
      swiper.slideTo(index);
    }
  };

  const handleSwiperSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex;
    const newTab = tabs[activeIndex];
    
    if (newTab && newTab.value !== currentTab) {
      setCurrentTab(newTab.value);
      // Update URL without triggering navigation
      window.history.pushState(null, '', `/my-coffee/${newTab.value}`);
    }
  };

  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "내 커피", 
    });
  }, []);

  return (
    <div>
      <div className="bg-background mt-4 px-4">
        <Tabs
          tabs={tabs}
          activeTab={currentTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Main Content with Swiper */}
      <div className="flex-1 overflow-hidden">
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={handleSwiperSlideChange}
          initialSlide={getTabIndex(currentTab)}
          modules={[FreeMode]}
          spaceBetween={0}
          slidesPerView={1}
          allowTouchMove={true}
          resistance={true}
          resistanceRatio={0.85}
          speed={300}
          className="h-full"
        >
          <SwiperSlide>
            <div className="h-full overflow-y-auto">
              <TasteAnalysis />
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="h-full overflow-y-auto">
              <Collection />
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="h-full overflow-y-auto">
              <MonthlyCoffee />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
