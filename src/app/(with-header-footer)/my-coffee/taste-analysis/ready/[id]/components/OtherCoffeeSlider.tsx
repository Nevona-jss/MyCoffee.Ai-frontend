"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CoffeePreferences, CoffeeRecord, Top5Recommendations } from "@/types/coffee";
import { usePost } from "@/hooks/useApi";

const OtherCoffeeSlider: React.FC<{ tasteRatings: CoffeePreferences }> = ({ tasteRatings }) => {

    const [data, setData] = useState<CoffeeRecord[]>();
    const previousRatings = useRef<CoffeePreferences | null>(null);
    const slides = [
        {
            id: 1,
            title: "브라이트 바디 블렌드",
            description: "“ 향긋한 꽃향기와 크리미한 바디감이 인상 깊습니다. “",
            ratings: {
                aroma: 4,
                acidity: 3,
                sweetness: 4,
                nutty: 5,
                body: 4
            }
        },
        {
            id: 2,
            title: "브라이트 바디 블렌드",
            description: "“ 향긋한 꽃향기와 크리미한 바디감이 인상 깊습니다. “",
            ratings: {
                aroma: 3,
                acidity: 2,
                sweetness: 3,
                nutty: 5,
                body: 5
            }
        },
        {
            id: 3,
            title: "브라이트 바디 블렌드",
            description: "“ 향긋한 꽃향기와 크리미한 바디감이 인상 깊습니다. “",
            ratings: {
                aroma: 5,
                acidity: 4,
                sweetness: 3,
                nutty: 2,
                body: 3
            }
        }
    ];

    const tasteLabels = [
        { key: 'aroma', label: '향', color: 'aroma' },
        { key: 'acidity', label: '산미', color: 'acidity' },
        { key: 'sweetness', label: '단맛', color: 'sweetness' },
        { key: 'nutty', label: '고소함', color: 'nutty' },
        { key: 'body', label: '바디', color: 'body' }
    ];

    const { mutate: getTop5Recommendations, isPending: isGettingTop5Recommendations } = usePost<Top5Recommendations, CoffeePreferences & { limitSimilar: number }>(
        '/recommendation/top5',
        {
          onSuccess: (data) => {
            setData(data?.data?.recordset);
          },
        }
      );      
    
      useEffect(() => {
        // Check if ratings actually changed
        const hasChanged = !previousRatings.current || 
          previousRatings.current.aroma !== tasteRatings.aroma ||
          previousRatings.current.acidity !== tasteRatings.acidity ||
          previousRatings.current.sweetness !== tasteRatings.sweetness ||
          previousRatings.current.nutty !== tasteRatings.nutty ||
          previousRatings.current.body !== tasteRatings.body;

        if (hasChanged) {
          getTop5Recommendations({...tasteRatings, limitSimilar: 5});
          previousRatings.current = { ...tasteRatings };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [tasteRatings.aroma, tasteRatings.acidity, tasteRatings.sweetness, tasteRatings.nutty, tasteRatings.body]);

    return (
        <div className="w-full">
            <Swiper
                modules={[Pagination]}
                spaceBetween={8}
                slidesPerView={2.1}
                pagination={false}
                className="w-full"
            >
                {data?.map((slide) => (
                    <SwiperSlide key={slide.coffee_blend_id}>
                        <div className="bg-white rounded-lg p-3 min-h-[180px] border border-border-default">
                            <h3 className="text-xs font-bold text-gray-0 mb-1">{slide.coffee_name}</h3>
                            
                            <p className="text-[10px] text-text-secondary mb-2 leading-[160%]">
                                {slide.coffee_name}
                            </p>

                            <div className="space-y-1">
                                {tasteLabels.map((taste) => (
                                    <div key={taste.key} className="flex items-center justify-between">
                                        <span className="text-[10px] text-gray-0">{taste.label}</span>
                                        <div className="flex gap-[3px]">
                                            {[1, 2, 3, 4, 5].map((dot) => (
                                                <div
                                                    key={dot}
                                                    className="w-2 h-2 rounded-full"
                                                    style={{
                                                        backgroundColor: dot <= Number(slide[`${taste.key}_score` as keyof CoffeeRecord])
                                                            ? `var(--${taste.color})`
                                                            : '#E6E6E6'
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

export default OtherCoffeeSlider;
