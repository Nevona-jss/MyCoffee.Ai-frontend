'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePost } from '@/hooks/useApi';
import { RecommendationRequest } from './types';
import { CoffeeData } from '@/types/coffee';
import { useRecommendationStore } from '@/stores/recommendation-store';
import SpiderChart from './SpiderChart';
import { Info } from 'lucide-react';

export default function AnalysisPage() {

    const router = useRouter();
    const [ratings, setRatings] = useState({
        aroma: 1,
        acidity: 1,
        sweetness: 1,
        nutty: 1,
        body: 1,
    });
    const [userId] = useState(0);
    const { setPreferences } = useRecommendationStore();

    const { mutate: getRecommendations, isPending: isGettingRecommendations } = usePost<CoffeeData, RecommendationRequest>(
        '/recommendation',
        {
            onSuccess: (data) => {
                if (data?.data?.preferences) {
                    setPreferences(data?.data?.preferences);
                }
                router.push('/result');
            },
        }
    );

    // Handle form submission
    const handleSubmitAnalysis = useCallback(() => {
        getRecommendations({
            aroma: ratings.aroma,
            acidity: ratings.acidity,
            nutty: ratings.nutty,
            body: ratings.body,
            sweetness: ratings.sweetness,
            userId: userId,
            saveAnalysis: 0,
        });
    }, [ratings, userId]);

    return (
        <>
            <div className="h-[100dvh] flex-1 flex flex-col justify-center items-center px-4 pb-10">
                <div className="my-auto">
                    <div className="w-full sm:mx-auto px-4 py-4">
                        <Image
                            src="/images/logo.svg"
                            alt="My Coffee.Ai"
                            className="w-[220px] h-[32px] mx-auto"
                            width={220}
                            height={32}
                        />
                        <p className="text-gray-0 text-center mt-3 text-[14px]">
                            나만의 커피 취향을 찾아볼까요?
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col justify-center items-center px-6 pb-8 sm:mx-auto">
                        {/* Radar Chart */}
                        <SpiderChart ratings={ratings} setRatings={setRatings} />
                    </div>
                </div>
                {/* CTA Button */}
                <button
                    onClick={handleSubmitAnalysis}
                    disabled={isGettingRecommendations}
                    className="btn-primary w-full text-center block disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGettingRecommendations ? '분석 중...' : '취향 분석 시작'}
                </button>
            </div>
        </>
    );
}
