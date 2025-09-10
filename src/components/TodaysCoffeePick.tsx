'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';

interface CoffeePick {
    id: number;
    name: string;
    subtitle: string;
    description: string;
    hashtags: string[];
}

const TodaysCoffeePick = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const coffeePicks: CoffeePick[] = [
        {
            id: 1,
            name: "오늘의 커피 Pick!",
            subtitle: "딥 바디 블렌드",
            description: "오늘은 부담 없이 즐기기 좋은, 깊이 있으면서도 깔끔한 딥 바디 블렌드가 잘 어울려요.",
            hashtags: ["#씁쓸 달콤", "#고소한 맛"]
        },
        {
            id: 2,
            name: "오늘의 커피 Pick",
            subtitle: "벨벳 터치 블렌드",
            description: "오늘은 부담 없이 즐기기 좋은, 깊이 있으면서도 깔끔한 딥 바디 블렌드가 잘 어울려요.",
            hashtags: ["#부드러운", "#균형잡힌"]
        }
    ];

    return (
        <div className="pb-4 bg-background-sub mb-4">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                className="todays-coffee-swiper"
                // loop={true}
            >
                {coffeePicks.map((pick) => (
                    <SwiperSlide key={pick.id} className="relative">
                        <div className="bg-primary rounded-lg px-[22px] pt-10 pb-8 overflow-hidden text-[#FCFCFC]">
                            <div className="relative z-10 flex items-center gap-6">
                                <div className="flex-1">
                                    <h2 className="text-sm font-medium text-accent mb-2">{pick.name}</h2>
                                    <p className="text-[18px] mb-[22px] leading-normal">
                                        {pick.subtitle}
                                    </p>
                                    <div className="flex gap-1 mb-1">
                                        {pick.hashtags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[10px] font-normal"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs mb-4 leading-normal">
                                        {pick.description}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 top-0 w-full h-full">
                                <Image
                                    src="/images/coffee.png"
                                    alt="Coffee"
                                    width={400}
                                    height={180}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="absolute top-4 right-4 z-20">
                                <span className="text-sm text-white text-opacity-70">
                                    {String(currentSlide + 1).padStart(2, '0')}/{String(coffeePicks.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* CTA Button - Swiper tashqarisida */}
            <div className="mt-4 px-3">
                <Link href="/analysis" className="btn-primary w-full text-center flex items-center justify-between !text-base !p-3 !pl-5">
                    <span>지금 내 커피 취향을 찾아보세요!</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default TodaysCoffeePick;