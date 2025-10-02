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
  
  const isMainTabRoute = () => {
    const mainRoutes = ['/my-coffee/taste-analysis', '/my-coffee/collection', '/my-coffee/monthly-coffee'];
    return mainRoutes.some(route => pathname === route);
  };

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

  useEffect(() => {
    const tabFromPath = getCurrentTab();
    if (tabFromPath !== currentTab) {
      setCurrentTab(tabFromPath);
      // Update swiper slide when pathname changes
      if (swiper && isMainTabRoute()) {
        const index = getTabIndex(tabFromPath);
        swiper.slideTo(index);
        // Update height after slide change
        setTimeout(() => {
          if (swiper && swiper.updateAutoHeight) {
            swiper.updateAutoHeight();
          }
        }, 50);
      }
    }
  }, [pathname]);

  // Update swiper when it's ready
  useEffect(() => {
    if (swiper) {
      const tabFromPath = getCurrentTab();
      const index = getTabIndex(tabFromPath);
      swiper.slideTo(index);
    }
  }, [swiper]);

  const handleTabChange = (tab: string) => {
    if (tab === currentTab) return;
    
    setCurrentTab(tab);
    
    // Update URL using useRouter
    router.push(`/my-coffee/${tab}`, { scroll: false });
    
    // Update swiper slide
    if (swiper) {
      const index = getTabIndex(tab);
      swiper.slideTo(index);
      
      // Update height after slide change
      setTimeout(() => {
        if (swiper && swiper.updateAutoHeight) {
          swiper.updateAutoHeight();
        }
      }, 100);
    }
  };

  const handleSwiperSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex;
    const newTab = tabs[activeIndex];
    
    if (newTab && newTab.value !== currentTab) {
      setCurrentTab(newTab.value);
      // Update URL using useRouter
      router.push(`/my-coffee/${newTab.value}`, { scroll: false });
    }
    
    // Update swiper height when slide changes
    setTimeout(() => {
      if (swiper && swiper.updateAutoHeight) {
        swiper.updateAutoHeight();
      }
    }, 100);
  };

  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "내 커피", 
    });
  }, []);

  // If we're on a sub-route (like /my-coffee/collection/[id]), just render children
  if (!isMainTabRoute()) {
    return <div className="flex-1 overflow-y-auto">{children}</div>;
  }

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
      <div className="flex-1">
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
          // className="h-auto"
          autoHeight={true}
          updateOnWindowResize={true}
          observer={true}
          observeParents={true}
        >
          <SwiperSlide>
            <div>
              <TasteAnalysis />
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div>
              <Collection />
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div>
              <MonthlyCoffee />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
