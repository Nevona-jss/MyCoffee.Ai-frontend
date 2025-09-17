"use client";

import React, { useState } from "react";
import Link from "next/link";

const CollectionPage = () => {
  const [showWarning, setShowWarning] = useState(true);

  // Sample coffee analyses data
  const coffeeAnalyses = [
    {
      id: 1,
      title: "나만의 커피 1호기",
      date: "2025-08-24",
      time: "오후 12:34",
      tag: "클래식 하모니 블렌드",
      description: "달달한 커피가 먹고 싶을 때 추천받은 커피"
    },
    {
      id: 2,
      title: "나만의 커피 2호기",
      date: "2025-08-23",
      time: "오후 3:15",
      tag: "프레시 아로마 블렌드",
      description: "상큼한 과일향이 돋보이는 커피"
    },
    {
      id: 3,
      title: "나만의 커피 2호기",
      date: "2025-08-23",
      time: "오후 3:15",
      tag: "프레시 아로마 블렌드",
      description: "상큼한 과일향이 돋보이는 커피"
    },
    {
      id: 4,
      title: "나만의 커피 2호기",
      date: "2025-08-23",
      time: "오후 3:15",
      tag: "프레시 아로마 블렌드",
      description: "상큼한 과일향이 돋보이는 커피"
    },
    {
      id: 5,
      title: "나만의 커피 2호기",
      date: "2025-08-23",
      time: "오후 3:15",
      tag: "프레시 아로마 블렌드",
      description: "상큼한 과일향이 돋보이는 커피"
    }
  ];

  return (
    <div className="px-4 py-4">
      <div>
        {/* Warning Banner */}
        {showWarning && (
          <div className="bg-[#FFF3CD] rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8V12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16H12.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex-1">
                <p className="text-[12px] text-[#F59E0B] leading-[140%]">
                  부담 없이 시작하세요, 첫 달은 무료입니다!
                </p>
              </div>
              <button
                onClick={() => setShowWarning(false)}
                className="flex-shrink-0 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Coffee Analysis Cards */}
        <div className="space-y-3">
          {coffeeAnalyses.map((analysis) => (
            <div key={analysis.id} className="bg-white rounded-2xl px-4 py-3 border border-border-default">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-0 mb-2">{analysis.title}</h3>
                <p className="text-[12px] text-[#AEAEAE] mb-2 font-normal">{analysis.date} {analysis.time}</p>

                <div className="flex items-center justify-center w-fit bg-[rgba(0,0,0,0.05)] rounded-lg px-2 py-1 mb-4">
                  <span className="text-[10px] text-gray-0 font-medium leading-[160%]">{analysis.tag}</span>
                </div>

                <p className="text-[12px] text-gray-0 leading-[150%]">{analysis.description}</p>
              </div>

              <div className="flex items-center justify-between gap-2">
                 <Link
                   href={`/my-coffee/collection/${analysis.id}`}
                   className="flex-1 py-[5px] border border-action-primary text-center bg-brand-secondary-accent-sub text-action-primary rounded-sm font-bold text-sm leading-[20px]"
                 >
                   주문하기
                 </Link>

                <button className="size-8 border border-action-primary rounded-sm flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.3335 4.1665H16.6668" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.3335 10H16.6668" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.3335 15.8335H16.6668" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {coffeeAnalyses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">아직 저장된 커피가 없어요</h3>
            <p className="text-gray-500 mb-6">커피 취향 분석을 통해 나만의 커피를 찾아보세요!</p>
            <Link
              href="/my-coffee/taste-analysis"
              className="inline-block px-6 py-3 bg-action-primary text-white rounded-lg font-medium hover:bg-action-primary-hover transition-colors"
            >
              취향 분석 시작하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;