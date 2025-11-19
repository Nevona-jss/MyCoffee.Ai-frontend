'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQryMutation } from '@/hooks/useApi';
import { CoffeeData } from '@/types/coffee';
import { useRecommendationStore } from '@/stores/recommendation-store';
import { api } from '@/lib/api';
import SpiderChart from '../../analysis/SpiderChart';
import Modal from 'react-responsive-modal';

type GetRecommendationsParams = {
    aroma: number;
    acidity: number;
    nutty: number;
    body: number;
    sweetness: number;
    userId: number;
    saveAnalysis: number;
};

export default function AnalysisPage() {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const router = useRouter();
    const [ratings, setRatings] = useState({
        aroma: 1,
        acidity: 1,
        sweetness: 1,
        nutty: 1,
        body: 1,
    });
    const [userId] = useState(0);
    const { setRecommendations } = useRecommendationStore();

    const { mutate: getRecommendations, isPending: isGettingRecommendations } = useQryMutation<CoffeeData, GetRecommendationsParams>({
        mutationFn: async (data: GetRecommendationsParams) => {
            const response = await api.get<CoffeeData>("/mycoffee/blend/top5", { params: data });
            return response.data;
        },
        options: {
            onSuccess: (data) => {
                setRecommendations(data?.reco_list);
                router.push('/on-event/result');
            },
        },
    });

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

    const onSubmitForm = () => {
        localStorage.setItem('tst_usr_nm', formData.name);
        localStorage.setItem('hphn_no', formData.phone);
        router.push('/on-event/history')
    }

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
                        <p className="text-text-secondary text-center mt-3 text-[14px] leading-[20px]">
                            나만의 커피 취향을 찾아볼까요?
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center px-6 pb-8 sm:mx-auto">
                        <SpiderChart
                            ratings={ratings}
                            setRatings={setRatings}
                        />
                    </div>
                </div>
                <button
                    onClick={handleSubmitAnalysis}
                    disabled={isGettingRecommendations}
                    className="btn-primary w-full text-center block disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGettingRecommendations ? '분석 중...' : '결과보기'}
                </button>
                <button className="btn-primary-outline w-full mt-2 text-center block" onClick={onOpenModal}>
                    이력 조회
                </button>
            </div>

            <Modal
                open={open}
                onClose={onCloseModal}
                center
                showCloseIcon={false}
                styles={{
                    modal: {
                        width: '361px',
                        padding: '12px',
                        borderRadius: '16px',
                    }
                }}
            >
                <div className="mb-3">
                    <label className="block text-xs leading-[16px] font-bold text-gray-0 mb-2">
                        이름
                    </label>
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="이름을 입력해주세요."
                        className="input-default"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-xs leading-[16px] font-bold text-gray-0 mb-2">
                        휴대폰 번호
                    </label>
                    <input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="휴대폰 번호를 입력해주세요."
                        className="input-default"
                    />
                </div>
                <button disabled={formData.name === '' || formData.phone === ''} onClick={onSubmitForm} className="btn-primary w-full mb-2">요청</button>
                <button className="btn-primary-empty !py-0.5 w-full !font-normal" onClick={onCloseModal}>취소</button>
            </Modal>
        </>
    );
}
