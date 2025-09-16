"use client";

import React from "react";
import MyCollection from "@/components/MyCollection";

const MyCoffeeCollectionPage = () => {
  return (
    <div className="px-4 py-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-0 mb-2">내 커피 컬렉션</h2>
        <p className="text-sm text-gray-500">
          당신이 시도해본 커피들을 확인해보세요
        </p>
      </div>

      {/* My Collection Component */}
      <MyCollection />

      {/* Add New Coffee Button */}
      <div className="mt-6">
        <button className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg py-8 text-center hover:border-[#FF7939] hover:text-[#FF7939] transition-colors">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="mb-2"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">새로운 커피 추가하기</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyCoffeeCollectionPage;
