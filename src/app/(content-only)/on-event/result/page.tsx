'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecommendationStore } from '@/stores/recommendation-store';
import { CoffeePreferences } from '@/types/coffee';
import { useGet } from '@/hooks/useApi';
import SpiderChart from '../../analysis/SpiderChart';
import RegisterBtn from './registerBtn';
import { Link } from 'lucide-react';

type BlendType = {
    name: string;
    description: string;
    origins: string[];
    ratings: CoffeePreferences;
}
export default function ResultPage() {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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
            router.replace('/on-event/analysis');
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
    }, [recommendations]);


    const { data: originData } = useGet<any>(
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
            setCoffeeBlend(prev => ({
                ...prev,
                origins: originData?.origin_summary?.match(/.*?\d+%/g).map((origin: any) => origin.trim())
            }));
        }
    }, [originData]);

    const { data: tastesData } = useGet(
        ["mycoffee", "blend", "taste", recommendations?.[0]?.coffee_blend_id],
        `/mycoffee/blend/${recommendations?.[0]?.coffee_blend_id}/taste`,
        {},
        {
            enabled: !!recommendations?.[0]?.coffee_blend_id
        }
    );    

    return (
        <>
            <div className="flex flex-col justify-center items-center px-4 pb-10">
                <div className='overflow-y-auto h-[calc(100vh-145px)] pt-[72px]'>
                    {/* Coffee Blend Card */}
                    <div className='w-full'>
                        <h1 className="text-xl font-bold text-gray-0 mb-2">{coffeeBlend.name}</h1>
                        <p className="text-sm mb-2 font-normal text-text-secondary">{coffeeBlend.description}</p>

                        {/* Origins */}
                        <div className="flex gap-1 mb-16">
                            {coffeeBlend.origins.map((origin, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-[rgba(0,0,0,0.05)] rounded-[10px] text-[12px] text-gray-0 leading-[16px]"
                                >
                                    {origin}
                                </span>
                            ))}
                        </div>

                        {/* Radar Chart */}
                        <div className="relative">
                            <SpiderChart
                                ratings={coffeeBlend.ratings}
                                setRatings={() => { }}
                                isChangable={false}
                                isClickable={true}
                                tastes={tastesData?.tastes}
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 mt-auto w-full">
                    <RegisterBtn
                        onOpenModal={onOpenModal}
                        onCloseModal={onCloseModal}
                        open={open}
                        setOpen={setOpen}
                        coffeeBlendId={recommendations?.[0].coffee_blend_id}
                    />
                    <button onClick={() => router.push('/on-event/analysis')} className="btn-primary-outline w-full" >다시 하기</button>
                </div>
            </div>
        </>
    );
}
