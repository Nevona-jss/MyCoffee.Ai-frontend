"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CoffeeBrewingAnimation from "./CoffeeBrewingAnimation";
import Link from "next/link";

const TasteAnalysisPage = () => {
  const [showBrewingAnimation, setShowBrewingAnimation] = useState(false);
  const router = useRouter();

  const handleStartAnalysis = () => {
    setShowBrewingAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowBrewingAnimation(false);
    // Navigate to ready page using Next.js router
    router.push('/my-coffee/taste-analysis/ready');
  };

  if (showBrewingAnimation) {
    return <CoffeeBrewingAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="px-4 pt-[36px] h-[calc(100dvh-220px)] flex flex-col">
      {/* Main Prompt */}
      <div className="text-center mb-8">
        <h1 className="text-[20px] font-bold text-gray-0 leading-[28px]">나만의 커피 취향을 찾아볼까요?</h1>
      </div>

      {/* Radar Chart */}
      <div className="flex justify-center mb-10">
        <div className="relative">
          <svg
            className="mx-auto no-select w-[300px] h-[300px] sm:w-[325px] sm:h-[325px]"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Outer pentagon border with dashed style */}
            {(() => {
              const centerX = 200;
              const centerY = 200;
              const maxRadius = 140;
              let pentagonPath = '';
              for (let i = 0; i < 5; i++) {
                const angle = (i * 72 - 90) * (Math.PI / 180);
                const x = centerX + maxRadius * Math.cos(angle);
                const y = centerY + maxRadius * Math.sin(angle);

                if (i === 0) {
                  pentagonPath += `M ${x} ${y} `;
                } else {
                  pentagonPath += `L ${x} ${y} `;
                }
              }
              pentagonPath += 'Z';

              return (
                <path
                  d={pentagonPath}
                  fill="none"
                  stroke="#B3B3B3"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                  opacity="0.8"
                />
              );
            })()}

            {/* Taste labels with proper positioning */}
            {[
              { key: 'aroma', label: '향', angle: 0, rating: 0 },
              { key: 'sweetness', label: '단맛', angle: 72, rating: 0 },
              { key: 'body', label: '바디', angle: 144, rating: 0 },
              { key: 'nutty', label: '고소함', angle: 216, rating: 0 },
              { key: 'acidity', label: '산미', angle: 288, rating: 4 }
            ].map((taste, index) => {
              const centerX = 200;
              const centerY = 200;
              // Custom label positioning based on taste
              let labelRadius = 175;
              if (taste.key === 'aroma') { // 향 - top
                labelRadius = 180; // 5px further out
              } else if (taste.key === 'sweetness') { // 단맛 - top right
                labelRadius = 180; // 5px further out
              }
              
              const angle = (taste.angle - 90) * (Math.PI / 180);
              const labelX = centerX + labelRadius * Math.cos(angle);
              const labelY = centerY + labelRadius * Math.sin(angle);

              return (
                <g key={taste.key}>
                  {/* Taste label */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[17px] font-medium fill-gray-0"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                  >
                    {taste.label}
                  </text>

                  {/* Rating badge background */}
                  <rect
                    x={labelX - 25}
                    y={labelY + 8}
                    width="48"
                    height="25"
                    rx="8"
                    fill="#FFF"
                    stroke="#E6E6E6"
                    strokeWidth="0.56"
                  />

                  {/* Rating number - only the number in orange */}
                  <text
                    x={labelX - 10}
                    y={labelY + 22}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FF7939"
                    fontSize="16"
                    fontWeight="400"
                    letterSpacing="-0.13px"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)', lineHeight: '150%' }}
                  >
                    {taste.rating}
                  </text>

                  {/* "/5" text in black */}
                  <text
                    x={labelX + 4}
                    y={labelY + 22}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1A1A1A"
                    fontSize="16"
                    fontWeight="400"
                    letterSpacing="-0.13px"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)', lineHeight: '150%' }}
                  >
                    /5
                  </text>
                </g>
              );
            })}

          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-auto">
        <button
          onClick={handleStartAnalysis}
          className="block w-full btn-primary text-center"
        >
          취향 분석 시작
        </button>
        
        <Link href={'/my-coffee/taste-analysis/ready'} className="block w-full btn-primary-empty !py-2.5 bg-white border-2 border-[#4E2A18] text-[#4E2A18] text-center">
          지난 커피 분석 보기
        </Link>
      </div>
    </div>
  );
};

export default TasteAnalysisPage;
