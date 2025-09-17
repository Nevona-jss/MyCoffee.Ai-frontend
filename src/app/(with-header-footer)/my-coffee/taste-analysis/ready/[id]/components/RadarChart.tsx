"use client";

import React from "react";

interface TasteRating {
  aroma: number;
  sweetness: number;
  body: number;
  nutty: number;
  acidity: number;
}

interface RadarChartProps {
  ratings: TasteRating;
}

const RadarChart: React.FC<RadarChartProps> = ({ ratings }) => {
  const tasteLabels = [
    { key: 'aroma', label: '향', color: 'purple' },
    { key: 'sweetness', label: '단맛', color: 'pink' },
    { key: 'body', label: '바디', color: 'brown' },
    { key: 'nutty', label: '고소함', color: 'orange' },
    { key: 'acidity', label: '산미', color: 'green' }
  ];

  const generateRadarPath = () => {
    const centerX = 200;
    const centerY = 200;
    const maxRadius = 150;
    let path = '';

    tasteLabels.forEach((taste, index) => {
      const angle = (index * 72 - 90) * (Math.PI / 180);
      const currentRadius = (ratings[taste.key as keyof TasteRating] / 5) * maxRadius;
      const x = centerX + currentRadius * Math.cos(angle);
      const y = centerY + currentRadius * Math.sin(angle);

      if (index === 0) {
        path += `M ${x} ${y} `;
      } else {
        path += `L ${x} ${y} `;
      }
    });
    path += 'Z';
    return path;
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <svg
          className="mx-auto no-select w-[280px] h-[280px] sm:w-[305px] sm:h-[305px]"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid - Concentric pentagons with varying stroke width */}
          {[1, 2, 3, 4, 5].map((level) => {
            const centerX = 200;
            const centerY = 200;
            const maxRadius = 150;
            const radius = (level / 5) * maxRadius;
            const strokeWidth = level / 2.2;

            let pentagonPath = '';
            for (let i = 0; i < 5; i++) {
              const angle = (i * 72 - 90) * (Math.PI / 180);
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);

              if (i === 0) {
                pentagonPath += `M ${x} ${y} `;
              } else {
                pentagonPath += `L ${x} ${y} `;
              }
            }
            pentagonPath += 'Z';

            return (
              <path
                key={level}
                d={pentagonPath}
                fill="none"
                stroke="#B3B3B3"
                strokeWidth={strokeWidth}
                strokeDasharray="4,2"
                opacity="0.8"
              />
            );
          })}

          {/* Radial lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const centerX = 200;
            const centerY = 200;
            const maxRadius = 150;
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const x = centerX + maxRadius * Math.cos(angle);
            const y = centerY + maxRadius * Math.sin(angle);

            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="#B3B3B3"
                strokeWidth="1"
                strokeDasharray="4,2"
                opacity="0.8"
              />
            );
          })}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
              <stop offset="35.51%" stopColor="rgba(255, 224, 173, 0.20)" />
              <stop offset="74.3%" stopColor="rgba(255, 131, 54, 0.20)" />
              <stop offset="94.73%" stopColor="rgba(255, 117, 32, 0.20)" />
              <stop offset="100%" stopColor="rgba(255, 113, 26, 0.20)" />
            </linearGradient>
          </defs>

          {/* Filled area with rounded corners */}
          <path
            d={generateRadarPath()}
            fill="url(#chartGradient)"
            stroke="#FF7927"
            strokeWidth="2.686"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rounded corner circles at connection points */}
          {tasteLabels.map((taste, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);
            const currentRadius = (ratings[taste.key as keyof TasteRating] / 5) * 150;
            const pointX = 200 + currentRadius * Math.cos(angle);
            const pointY = 200 + currentRadius * Math.sin(angle);

            return (
              <circle
                key={`connection-${taste.key}`}
                cx={pointX}
                cy={pointY}
                r="5.75"
                fill="#FF7927"
                width="11.5"
                height="11.5"
              />
            );
          })}

          {/* Taste labels */}
          {tasteLabels.map((taste, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);

            // Custom label positioning based on taste
            let labelRadius = 170;
            if (taste.key === 'aroma') { // 향 - top
              labelRadius = 170 + 17; // 17px up
            } else if (taste.key === 'acidity' || taste.key === 'sweetness') { // 산미, 단맛 - sides
              labelRadius = 170 + 12; // 12px out
            } else if (taste.key === 'nutty' || taste.key === 'body') { // 고소함, 바디 - bottom
              labelRadius = 170 + 7; // 7px out
            }

            const labelX = 200 + labelRadius * Math.cos(angle);
            const labelY = 200 + labelRadius * Math.sin(angle);

            return (
              <g key={taste.key}>
                {/* Taste label */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[14px] font-medium fill-gray-0"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                >
                  {taste.label}
                </text>

                {/* Rating badge background */}
                <rect
                  x={labelX - 20}
                  y={labelY + 8}
                  width="40"
                  height="22"
                  rx="8"
                  fill="#FFF"
                  stroke="#E6E6E6"
                  strokeWidth="0.56"
                />

                {/* Rating number - only the number in orange */}
                <text
                  x={labelX - 6}
                  y={labelY + 20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FF7927"
                  fontSize="12"
                  fontWeight="400"
                  letterSpacing="-0.13px"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)', lineHeight: '150%' }}
                >
                  {ratings[taste.key as keyof TasteRating]}
                </text>

                {/* "/5" text in black */}
                <text
                  x={labelX + 4}
                  y={labelY + 20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#1A1A1A"
                  fontSize="12"
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
  );
};

export default RadarChart;
