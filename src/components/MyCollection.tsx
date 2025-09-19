'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface TasteRating {
    aroma: number;
    acidity: number;
    sweetness: number;
    nutty: number;
    body: number;
}

interface CoffeeBlend {
    name: string;
    description: string;
    hashtags: string[];
    ratings: TasteRating;
}

const MyCollection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const tasteLabels = [
        { key: 'aroma', label: '향', color: '#BE9FE2' },
        { key: 'acidity', label: '산미', color: '#DCF494' },
        { key: 'sweetness', label: '단맛', color: '#FFB5C2' },
        { key: 'nutty', label: '고소함', color: '#D8A058' },
        { key: 'body', label: '바디', color: '#3B1C1C' },
    ];

    const generateRadarPath = (ratings: TasteRating) => {
        const centerX = 90;
        const centerY = 110;
        const maxRadius = 60;

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

    const coffeeBlends: CoffeeBlend[] = [
        {
            name: "벨벳 터치 블렌드",
            description: "오늘, 깊고 깔끔한 맛을 가진, 마시기 편한 Deep Body Blend가 당신에게 딱 맞습니다.",
            hashtags: ["씁쓸 달콤", "고소한 맛", "밸런스"],
            ratings: {
                aroma: 4,
                acidity: 3,
                sweetness: 4,
                nutty: 5,
                body: 5
            }
        },
        {
            name: "벨벳 터치 블렌드",
            description: "깔끔한 마무리와 산뜻한 입안 감촉이 좋은 커피입니다.",
            hashtags: ["씁쓸 달콤", "고소한 맛", "밸런스"],
            ratings: {
                aroma: 5,
                acidity: 4,
                sweetness: 4,
                nutty: 3,
                body: 4
            }
        },
        {
            name: "벨벳 터치 블렌드 ",
            description: "깔끔한 마무리와 산뜻한 입안 감촉이 좋은 커피입니다.",
            hashtags: ["씁쓸 달콤", "고소한 맛"],
            ratings: {
                aroma: 5,
                acidity: 4,
                sweetness: 4,
                nutty: 3,
                body: 4
            }
        },
        {
            name: "벨벳 터치 블렌드 ",
            description: "깔끔한 마무리와 산뜻한 입안 감촉이 좋은 커피입니다.",
            hashtags: ["씁쓸 달콤", "고소한 맛", "밸런스"],
            ratings: {
                aroma: 5,
                acidity: 4,
                sweetness: 4,
                nutty: 3,
                body: 4
            }
        }
    ];

    return (
        <div className="mb-4 bg-background-sub py-3 pl-4 text-gray-0">
            <div className="flex items-center justify-between mb-3 pr-6">
                <h2 className="text-base font-bold">내 커피 컬렉션</h2>
                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M1.5 10.5L6.5 6L1.5 1.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <Swiper
                spaceBetween={8}
                slidesPerView={1.8}
                loop={true}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                className="coffee-collection-swiper"
            >
                {coffeeBlends.map((blend, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-background-sub rounded-lg p-3 border border-[#D9D9D9] text-gray-0">
                            <div className='border-b border-[#D9D9D9] pb-3 mb-3'>
                                <h3 className="text-[14px] font-medium mb-0.5 leading-normal">{blend.name}</h3>
                                <div className="flex items-center gap-1">
                                    {
                                        blend.hashtags.map((hashtag, index) => (
                                            <div key={index} className="flex items-center gap-0.5">
                                                <div 
                                                    className="w-0.5 h-0.5 rounded-full"
                                                    style={{
                                                        backgroundColor: '#D2954F'
                                                    }}
                                                ></div>
                                                <span className="text-[10px] font-light text-[#6E6E6E] leading-[16px]">{hashtag}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {/* Radar Chart */}
                            <div className="mb-2">
                                <svg
                                    className="w-[180px] h-[180px] mx-auto"
                                    viewBox="0 0 180 200"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    {/* Grid */}
                                    {[1, 2, 3, 4, 5].map((level) => {
                                        const centerX = 90;
                                        const centerY = 110;
                                        const maxRadius = 60;
                                        const radius = (level / 5) * maxRadius;

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
                                                strokeWidth="0.5"
                                                strokeDasharray="2,2"
                                                opacity="1"
                                            />
                                        );
                                    })}

                                    {/* Radial lines from center to each corner */}
                                    {tasteLabels.map((taste, index) => {
                                        const angle = (index * 72 - 90) * (Math.PI / 180);
                                        const centerX = 90;
                                        const centerY = 110;
                                        const maxRadius = 60;
                                        const endX = centerX + maxRadius * Math.cos(angle);
                                        const endY = centerY + maxRadius * Math.sin(angle);
                                        
                                        return (
                                            <line
                                                key={`radial-${taste.key}`}
                                                x1={centerX}
                                                y1={centerY}
                                                x2={endX}
                                                y2={endY}
                                                stroke="#B3B3B3"
                                                strokeWidth="0.5"
                                                strokeDasharray="2,2"
                                                opacity="0.7"
                                            />
                                        );
                                    })}

                                    {/* Gradient Definition */}
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
                                            <stop offset="35.51%" stopColor="rgba(255, 224, 173, 0.20)" />
                                            <stop offset="74.3%" stopColor="rgba(255, 131, 54, 0.20)" />
                                            <stop offset="94.73%" stopColor="rgba(255, 117, 32, 0.20)" />
                                            <stop offset="100%" stopColor="rgba(255, 113, 26, 0.20)" />
                                        </linearGradient>
                                    </defs>

                                    {/* Filled area */}
                                    <path
                                        d={generateRadarPath(blend.ratings)}
                                        fill="url(#chartGradient)"
                                        stroke="#FF7927"
                                        strokeWidth="0.7"
                                    />

                                    {/* Connection point circles */}
                                    {tasteLabels.map((taste, index) => {
                                        const angle = (index * 72 - 90) * (Math.PI / 180);
                                        const currentRadius = (blend.ratings[taste.key as keyof TasteRating] / 5) * 60;
                                        const pointX = 90 + currentRadius * Math.cos(angle);
                                        const pointY = 110 + currentRadius * Math.sin(angle);
                                        
                                        return (
                                            <circle
                                                key={`connection-${taste.key}`}
                                                cx={pointX}
                                                cy={pointY}
                                                r="3.4"
                                                fill="#FF7927"
                                            />
                                        );
                                    })}

                                    {/* Taste Labels */}
                                    {tasteLabels.map((taste, index) => {
                                        const angle = (index * 72 - 90) * (Math.PI / 180);
                                        const labelRadius = 75;
                                        const x = 90 + labelRadius * Math.cos(angle);
                                        const y = 110 + labelRadius * Math.sin(angle);
                                        
                                        return (
                                            <text
                                                key={taste.key}
                                                x={x}
                                                y={y}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="#666666"
                                                fontSize="12"
                                                fontFamily="suite, sans-serif"
                                            >
                                                {taste.label}
                                            </text>
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* Taste dots */}
                            <div className="space-y-1 mb-2 mt-1">
                                {tasteLabels.map((taste) => (
                                    <div key={taste.key} className="flex items-center justify-between">
                                        <span className="text-[10px] font-normal leading-[16px]">{taste.label}</span>
                                        <div className="flex gap-[3px]">
                                            {[1, 2, 3, 4, 5].map((dot) => (
                                                <div
                                                    key={dot}
                                                    className={`w-2 h-2 rounded-full`}
                                                    style={{
                                                        backgroundColor: dot <= blend.ratings[taste.key as keyof TasteRating] ? taste.color : '#E6E6E6'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MyCollection;