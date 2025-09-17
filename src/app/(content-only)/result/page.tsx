'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TasteRating {
    aroma: number; // 향
    acidity: number; // 산미
    sweetness: number; // 단맛
    nutty: number; // 고소함
    body: number; // 바디
}

export default function ResultPage() {
    const [ratings] = useState<TasteRating>({
        aroma: 5,
        acidity: 4,
        sweetness: 4,
        nutty: 3,
        body: 4,
    });

    const tasteLabels = [
        { key: 'aroma', label: '향', position: 'top', color: 'aroma' },
        { key: 'acidity', label: '산미', position: 'top-left', color: 'acidity' },
        { key: 'sweetness', label: '단맛', position: 'top-right', color: 'sweetness' },
        { key: 'nutty', label: '고소함', position: 'bottom-left', color: 'nutty' },
        { key: 'body', label: '바디', position: 'bottom-right', color: 'body' },
    ];

    const generateRadarPath = () => {
        const centerX = 200;
        const centerY = 200;
        const maxRadius = 150;

        const points = tasteLabels.map((taste, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);
            const radius = (ratings[taste.key as keyof TasteRating] / 5) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return { x, y };
        });

        const pathData = points.map((point, index) =>
            `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        ).join(' ') + ' Z';

        return pathData;
    };

    const coffeeBlends = [
        {
            name: "벨벳 터치 블렌드",
            description: "깔끔한 마무리와 산뜻한 입안 감촉이 좋은 커피입니다.",
            origins: [
                { country: "케냐", percentage: 51 },
                { country: "코스타리카", percentage: 49 }
            ],
            ratings: {
                aroma: 5,
                acidity: 4,
                sweetness: 4,
                nutty: 3,
                body: 4
            }
        }
    ];

    const tasteDescriptions = {
        aroma: "풍부하고 매혹적인 향이 인상적입니다.",
        acidity: "상큼한 산미가 또렷하게 느껴집니다.",
        sweetness: "입안 가득 자연스러운 단맛이 감돕니다.",
        nutty: "볶은 견과류 같은 깊은 고소함이 강조됩니다.",
        body: "적당한 농도와 무게감이 있습니다."
    };

    return (
        <>
            {/* Main Content */}
            <div className="h-[100dvh] flex-1 flex flex-col justify-center items-center px-4 py-6">

                {/* Coffee Blend Card */}
                {coffeeBlends.map((blend, index) => (
                    <div key={index}>
                        <h1 className="text-xl font-bold text-[#4E2A18] mb-2">{blend.name}</h1>
                        <p className="text-gray-0 text-sm mb-2 font-normal">{blend.description}</p>

                        {/* Origins */}
                        <div className="flex gap-1 mb-4">
                            {blend.origins.map((origin, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-[rgba(0,0,0,0.05)] rounded-[10px] text-[10px] text-[#999]"
                                >
                                    {origin.country} {origin.percentage}%
                                </span>
                            ))}
                        </div>

                        {/* Radar Chart */}
                        <div className="relative">
                            <svg
                                className="mx-auto no-select w-[300px] h-[300px] sm:w-[325px] sm:h-[325px]"
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

                        {/* Taste Details Cards */}
                        <div className="grid grid-cols-2 gap-2 mb-[34px]">
                            {tasteLabels.map((taste) => (
                                <div key={taste.key} className="bg-background-sub border border-line rounded-lg px-4 py-3">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xs font-medium text-gray-0">{taste.label}</h3>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((dot) => (
                                                <div
                                                    key={dot}
                                                    className={`w-2 h-2 rounded-full`}
                                                    style={{
                                                        backgroundColor: dot <= ratings[taste.key as keyof TasteRating]
                                                            ? `var(--${taste.color})`
                                                            : '#E6E6E6'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-[#999] leading-[140%]">
                                        {tasteDescriptions[taste.key as keyof typeof tasteDescriptions]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* CTA Buttons */}
                <div className="space-y-5 mt-auto w-full">
                    <Link href="/auth/login-select" className="btn-primary w-full text-center block">
                        회원 가입
                    </Link>
                    <Link href="/" className="block text-center text-base text-primary font-bold">
                        둘러보고 나중에 할래요.
                    </Link>
                </div>
            </div>
        </>
    );
}
