"use client";

import React from "react";
import Link from "next/link";

const TasteAnalysisPage = () => {
  return (
    <div className="px-4 py-6">
      {/* Main Prompt */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-0 mb-2">
          나만의 커피 취향을 찾아볼까요?
        </h1>
      </div>

      {/* Radar Chart */}
      <div className="flex justify-center mb-8">
        <div className="relative w-80 h-80">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="absolute inset-0"
          >
            {/* Background pentagon */}
            <polygon
              points="160,40 240,100 200,200 120,200 80,100"
              fill="none"
              stroke="#E6E6E6"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            {/* Grid lines */}
            <line x1="160" y1="40" x2="160" y2="200" stroke="#E6E6E6" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="80" y1="100" x2="240" y2="100" stroke="#E6E6E6" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="120" y1="200" x2="200" y2="200" stroke="#E6E6E6" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="100" y1="150" x2="220" y2="150" stroke="#E6E6E6" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="120" y1="120" x2="200" y2="180" stroke="#E6E6E6" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="200" y1="120" x2="120" y2="180" stroke="#E6E6E6" strokeWidth="1" strokeDasharray="2,2" />
            
            {/* Taste labels and ratings */}
            {/* 향 (Aroma) - Top */}
            <text x="160" y="25" textAnchor="middle" className="text-sm font-bold fill-gray-0">
              향
            </text>
            <text x="160" y="35" textAnchor="middle" className="text-xs font-bold fill-[#FF7939]">
              0/5
            </text>
            
            {/* 단맛 (Sweetness) - Top Right */}
            <text x="255" y="95" textAnchor="middle" className="text-sm font-bold fill-gray-0">
              단맛
            </text>
            <text x="255" y="105" textAnchor="middle" className="text-xs font-bold fill-[#FF7939]">
              0/5
            </text>
            
            {/* 바디 (Body) - Bottom Right */}
            <text x="255" y="215" textAnchor="middle" className="text-sm font-bold fill-gray-0">
              바디
            </text>
            <text x="255" y="225" textAnchor="middle" className="text-xs font-bold fill-[#FF7939]">
              0/5
            </text>
            
            {/* 고소함 (Nutty) - Bottom Left */}
            <text x="65" y="215" textAnchor="middle" className="text-sm font-bold fill-gray-0">
              고소함
            </text>
            <text x="65" y="225" textAnchor="middle" className="text-xs font-bold fill-[#FF7939]">
              0/5
            </text>
            
            {/* 산미 (Acidity) - Top Left */}
            <text x="65" y="95" textAnchor="middle" className="text-sm font-bold fill-gray-0">
              산미
            </text>
            <text x="65" y="105" textAnchor="middle" className="text-xs font-bold fill-[#FF7939]">
              4/5
            </text>
            
            {/* Current rating circle for 산미 */}
            <circle cx="160" cy="120" r="6" fill="#FF7939" />
          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/analysis"
          className="block w-full bg-[#FF7939] text-white text-center py-4 rounded-lg font-bold text-lg hover:bg-[#E66A2A] transition-colors"
        >
          취향 분석 시작
        </Link>
        
        <button className="block w-full bg-white border-2 border-[#FF7939] text-[#FF7939] text-center py-4 rounded-lg font-bold text-lg hover:bg-[#FF7939] hover:text-white transition-colors">
          지난 커피 분석 보기
        </button>
      </div>
    </div>
  );
};

export default TasteAnalysisPage;
