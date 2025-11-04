'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecommendationStore } from '@/stores/recommendation-store';
import SpiderChart from '../analysis/SpiderChart';
import { CoffeePreferences } from '@/types/coffee';
import { useGet } from '@/hooks/useApi';

type BlendType = {
    name: string;
    description: string;
    origins: string[];
    ratings: CoffeePreferences;
}
export default function ResultPage() {
    const router = useRouter();
    const { recommendations } = useRecommendationStore();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const [coffeeBlend, setCoffeeBlend] = useState<BlendType>({
        name: "벨벳 터치 블렌드",
        description: "깔끔한 마무리와 산뜻한 입안 감촉이 좋은 커피입니다.",
        origins: ["케냐 51%", "코스타리카 49%"],
        ratings: {
        aroma: 5,
        acidity: 4,
        sweetness: 4,
        nutty: 3,
            body: 4
        }
    });

    // Agar refresh bo'lsa (recommendations yo'q), analysis page'ga redirect
    useEffect(() => {
        if (!recommendations?.length || !recommendations?.[0] || !recommendations?.[0].coffee_blend_id) {
            setIsRedirecting(true);
            router.replace('/analysis');
        }
    }, [recommendations, router]);

    // Redirect bo'layotganda hech narsa ko'rsatma
    if (isRedirecting || !recommendations?.length || !recommendations?.[0] || !recommendations?.[0].coffee_blend_id) {
        return null;
    }
    
    useEffect(() => {
        if (recommendations) {
            setCoffeeBlend({
                name: recommendations?.[0].coffee_name,
                description: recommendations?.[0].summary,
                origins: ["케냐 51%", "코스타리카 49%"],
                ratings: {
                    aroma: recommendations?.[0].aroma_score,
                    acidity: recommendations?.[0].acidity_score,
                    sweetness: recommendations?.[0].sweetness_score,
                    nutty: recommendations?.[0].nutty_score,
                    body: recommendations?.[0].body_score
                }
            });
        }
    }, [setCoffeeBlend]);


    const {data: originData} = useGet<any>(
        ["mycoffee", "blend", "origin", recommendations?.[0]?.coffee_blend_id], 
        `/mycoffee/blend/${recommendations?.[0]?.coffee_blend_id}/origin`,
        {
            params: {
                coffee_blend_id: recommendations?.[0]?.coffee_blend_id,
            },
        },
        {
            enabled: !!recommendations?.[0]?.coffee_blend_id
        }
    );

    useEffect(() => {
        if (originData) {
            setCoffeeBlend({
                ...coffeeBlend,
                origins: originData?.origin_summary?.match(/.*?\d+%/g).map((origin: any) => origin.trim())
            });
        }
    }, [originData]);

    const {data: tastesData} = useGet(
        ["mycoffee", "blend", "taste", recommendations?.[0]?.coffee_blend_id], 
        `/mycoffee/blend/${recommendations?.[0]?.coffee_blend_id}/taste`
    );

    return (
        <>
            <div className="flex flex-col justify-center items-center px-4 pb-10">
                <div className='overflow-y-auto h-[calc(100vh-140px)] pt-6'>
                    {/* Coffee Blend Card */}
                    <div className='w-full'>
                        <h1 className="text-xl font-bold text-[#4E2A18] mb-2">{coffeeBlend.name}</h1>
                        <p className="text-gray-0 text-sm mb-2 font-normal">{coffeeBlend.description}</p>

                            {/* Origins */}
                        <div className="flex gap-1 mb-16">
                            {coffeeBlend.origins.map((origin, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 bg-[rgba(0,0,0,0.05)] rounded-[10px] text-[12px] text-[#999]"
                                    >
                                    {origin}
                                    </span>
                                ))}
                            </div>

                            {/* Radar Chart */}
                            <div className="relative">
                            <SpiderChart 
                                ratings={coffeeBlend.ratings} 
                                setRatings={() => {}}
                                isChangable={false}
                                isClickable={true}
                                tastes={tastesData?.tastes}
                            />
                            </div>

                            {/* Taste Details Cards */}
                        {/* <div className="grid grid-cols-2 gap-2 mb-[34px]">
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
                                                        backgroundColor: dot <= ratings[taste.key as keyof CoffeePreferences]
                                                                ? `var(--${taste.color})`
                                                                : '#E6E6E6'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-[12px] text-[#999] leading-[140%] w-[100px]">
                                            {tasteDescriptions[taste.key as keyof typeof tasteDescriptions]}
                                        </p>
                                    </div>
                                ))}
                        </div> */}
                        </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-5 mt-auto w-full">
                    <Link href="/auth/login-select" className="btn-primary w-full text-center block">
                        회원 가입
                    </Link>
                    <Link href="/" className="block text-center text-base text-gray-0 font-normal">
                        둘러보고 나중에 할래요.
                    </Link>
                </div>
            </div>
        </>
    );
}
