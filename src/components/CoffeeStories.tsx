'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';

interface CoffeeStory {
    id: number;
    title: string;
    date: string;
    image: string;
    category: string;
}

const CoffeeStories = () => {
    const [activeTab, setActiveTab] = useState('커피스토리');

    const coffeeStories: CoffeeStory[] = [
        {
            id: 1,
            title: "오늘의 커피 이야기 : 콜롬비아 수프리마",
            date: "2025.08.20",
            image: "/images/coffee-story.png",
            category: "커피스토리"
        },
        {
            id: 2,
            title: "커피 원두 보관법 완벽 가이드",
            date: "2025.08.19",
            image: "/images/coffee-story.png",
            category: "커피꿀팁"
        },
        {
            id: 3,
            title: "에티오피아 예가체프의 매력",
            date: "2025.08.18",
            image: "/images/coffee-story.png",
            category: "커피스토리"
        }
    ];

    const filteredStories = coffeeStories.filter(story => story.category === activeTab);

    return (
        <div className="mb-3 bg-background-sub py-3 pl-4 text-gray-0">
            <h2 className="text-base font-bold mb-3">알차게 즐기는 My Coffee.Ai</h2>
            
            {/* Tab Buttons */}
            <div className="flex gap-4 mb-3">
                <button 
                    onClick={() => setActiveTab('커피스토리')}
                    className={`px-2.5 py-1 rounded-sm text-[15px] font-normal text-[#4E2A18] cursor-pointer ${
                        activeTab === '커피스토리' 
                            ? 'bg-[#FFE5BF] ' 
                            : ''
                    }`}
                >
                    커피스토리
                </button>
                <button 
                    onClick={() => setActiveTab('커피꿀팁')}
                    className={`px-2.5 py-1 rounded-sm text-[15px] font-normal text-[#4E2A18] cursor-pointer ${
                        activeTab === '커피꿀팁' 
                            ? 'bg-[#FFE5BF] ' 
                            : ''
                    }`}
                >
                    커피꿀팁
                </button>
            </div>
            
            {/* Stories Slider */}
            <Swiper
                spaceBetween={12}
                slidesPerView={1.5}
                // loop={true}
                className="coffee-stories-swiper"
            >
                {filteredStories.map((story) => (
                    <SwiperSlide key={story.id}>
                        <div className="rounded-lg overflow-hidden">
                            {/* Story Image */}
                            <div className="relative h-[180px]">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    width={200}
                                    height={128}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-2 left-2.5 rounded-2xl">
                                    <span className="px-2 py-1 border-[0.5px] border-[#ECECEC] bg-[rgba(255,255,255,0.40)] text-[#292828] text-[8px] font-medium leading-normal rounded-2xl">
                                        {story.category}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Story Content */}
                            <div className="pt-2.5 bg-background-sub">
                                <h3 className="text-sm font-normal text-black mb-0.5 line-clamp-1">
                                    {story.title}
                                </h3>
                                <p className="text-xs text-[#282828] font-light">{story.date}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CoffeeStories;
