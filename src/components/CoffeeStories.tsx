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
            title: "오늘의 커피 이야기 : 콜롬비아 수프리마",
            date: "2025.08.19",
            image: "/images/coffee-story.png",
            category: "커피꿀팁"
        },
        {
            id: 3,
            title: "오늘의 커피 이야기 : 콜롬비아 수프리마",
            date: "2025.08.18",
            image: "/images/coffee-story.png",
            category: "커피스토리"
        }
    ];

    const filteredStories = coffeeStories.filter(story => story.category === activeTab);

    return (
        <div className="mb-6 bg-background-sub py-3 pl-4 text-gray-0">
            <h2 className="text-base font-bold mb-3 leading-[125%]">알차게 즐기는 My Coffee.Ai</h2>
            
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-3">
                <button 
                    onClick={() => setActiveTab('커피스토리')}
                    className={`px-2.5 py-1 rounded-sm text-[15px] font-normal text-[#4E2A18] leading-[133%] cursor-pointer ${
                        activeTab === '커피스토리' 
                            ? 'bg-[#FFE5BF] ' 
                            : ''
                    }`}
                >
                    커피스토리
                </button>
                <button 
                    onClick={() => setActiveTab('커피꿀팁')}
                    className={`px-2.5 py-1 rounded-sm text-[15px] font-normal text-[#4E2A18] leading-[133%] cursor-pointer ${
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
                slidesPerView={1.6}
                // loop={true}
                className="coffee-stories-swiper"
            >
                {filteredStories.map((story) => (
                    <SwiperSlide key={story.id}>
                        <div className="rounded-t-2xl overflow-hidden">
                            {/* Story Image */}
                            <div className="relative h-[180px]">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    width={200}
                                    height={128}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-2 left-2.5 rounded-2xl">
                                    <span className="px-1 py-0.5 text-white border-[0.5px] border-[#ECECEC] bg-[rgba(0,0,0,0.40)] text-[10px] font-medium leading-normal rounded-xl">
                                        {story.category}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Story Content */}
                            <div className="pt-2 bg-background-sub">
                                <h3 className="text-sm font-normal text-gray-0 mb-1 line-clamp-1 leading-[142%]">
                                    {story.title}
                                </h3>
                                <p className="text-xs text-[#999] font-normal leading-[150%]">{story.date}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CoffeeStories;
