"use client";

import React from "react";
import Image from "next/image";

const MonthlyCoffeePage = () => {
  const monthlyCoffees = [
    {
      id: 1,
      name: "에티오피아 예가체프",
      origin: "에티오피아",
      roast: "라이트 로스트",
      flavor: "과일향, 꽃향, 밝은 산미",
      image: "/images/coffee1.jpg",
      rating: 4.5,
    },
    {
      id: 2,
      name: "콜롬비아 수프리모",
      origin: "콜롬비아",
      roast: "미디엄 로스트",
      flavor: "견과류, 초콜릿, 균형잡힌 산미",
      image: "/images/coffee2.jpg",
      rating: 4.2,
    },
    {
      id: 3,
      name: "과테말라 안티구아",
      origin: "과테말라",
      roast: "다크 로스트",
      flavor: "스모키, 카라멜, 진한 바디",
      image: "/images/coffee3.jpg",
      rating: 4.7,
    },
  ];

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-0 mb-2">이달의 커피</h2>
        <p className="text-sm text-gray-500">
          이번 달 추천 커피를 만나보세요
        </p>
      </div>

      {/* Monthly Coffee List */}
      <div className="space-y-4">
        {monthlyCoffees.map((coffee) => (
          <div
            key={coffee.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              {/* Coffee Image */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12Z"
                    fill="#FF7939"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M8 7H16C16.55 7 17 7.45 17 8V12C17 12.55 16.55 13 16 13H8C7.45 13 7 12.55 7 12V8C7 7.45 7.45 7 8 7Z"
                    fill="#FF7939"
                  />
                  <path
                    d="M7 15H17C17.55 15 18 15.45 18 16C18 16.55 17.55 17 17 17H7C6.45 17 6 16.55 6 16C6 15.45 6.45 15 7 15Z"
                    fill="#FF7939"
                  />
                </svg>
              </div>

              {/* Coffee Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-0 mb-1">
                  {coffee.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{coffee.origin}</p>
                <p className="text-xs text-gray-400 mb-2">{coffee.roast}</p>
                <p className="text-sm text-gray-600 mb-2">{coffee.flavor}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill={i < Math.floor(coffee.rating) ? "#FF7939" : "#E5E7EB"}
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {coffee.rating}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className="bg-[#FF7939] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#E66A2A] transition-colors">
                자세히
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-6 text-center">
        <button className="text-[#FF7939] text-sm font-medium hover:underline">
          더 많은 커피 보기
        </button>
      </div>
    </div>
  );
};

export default MonthlyCoffeePage;
