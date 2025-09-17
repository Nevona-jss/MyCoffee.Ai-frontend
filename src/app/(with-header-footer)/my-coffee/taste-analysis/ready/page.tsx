"use client";

import React, { useState } from "react";
import Link from "next/link";

const ReadyPage = () => {
  const [showWarning, setShowWarning] = useState(true);

  const coffeeAnalyses = [
    {
      id: 1,
      title: "클래식 하모니 블렌드",
      date: "2025-08-24",
      time: "오후 12:34"
    },
    {
      id: 2,
      title: "클래식 하모니 블렌드",
      date: "2025-08-24",
      time: "오후 12:34"
    },
    {
      id: 3,
      title: "클래식 하모니 블렌드",
      date: "2025-08-24",
      time: "오후 12:34"
    },
    {
      id: 4,
      title: "클래식 하모니 블렌드",
      date: "2025-08-24",
      time: "오후 12:34"
    }
  ];

  return (
    <div className="bg-background">
      {/* Warning Banner */}
      {showWarning && (
        <div className="bg-[#FFF3CD] mx-4 mt-4 rounded-lg px-4 py-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8V12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 16H12.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[#F59E0B] text-xs font-normal flex-1 leading-[150%]">
            지난 커피 분석은 24시간 후 사라집니다. 마음에 드는 커피는 내 컬렉션에 담아두세요.
          </p>
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
      )}

      {/* Coffee Analysis Cards */}
      <div className="px-4 mt-4 space-y-4">
        {coffeeAnalyses.map((analysis) => (
          <div key={analysis.id} className="bg-white rounded-2xl px-4 py-3 border border-border-default">
            {/* Title */}
            <h3 className="text-sm font-bold text-gray-0 mb-2">
              {analysis.title}
            </h3>

            {/* Date and Time */}
            <p className="text-xs text-[#AEAEAE] mb-4">
              {analysis.date} {analysis.time}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/my-coffee/taste-analysis/ready/${analysis.id}`}
                className="flex-1 py-[5px] border border-action-primary text-center bg-brand-secondary-accent-sub text-action-primary rounded-sm font-bold text-sm leading-[20px]"
              >
                취향 분석 시작
              </Link>

              <button className="size-8 border border-action-primary rounded-sm flex items-center justify-center cursor-pointer " >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8334 5V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96746 18.1577 4.6549 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V5" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 5H17.5" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.66675 4.99984V3.33317C6.66675 2.89114 6.84234 2.46722 7.1549 2.15466C7.46746 1.8421 7.89139 1.6665 8.33341 1.6665H11.6667C12.1088 1.6665 12.5327 1.8421 12.8453 2.15466C13.1578 2.46722 13.3334 2.89114 13.3334 3.33317V4.99984" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadyPage;
