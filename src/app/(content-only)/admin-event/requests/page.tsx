'use client';

import ActionSheet from '@/components/ActionSheet';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RequestItem = {
    id: string;
    date: string;
    time: string;
    productName: string;
    productId: string;
    blendRatio: string;
    status: '대기' | '수령 완료';
    name: string;
    phone: string;
    personalInfoAgreed: boolean;
    marketingAgreed: boolean;
};

export default function AdminEventRequests() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'전체' | '대기' | '수령 완료'>('전체');

    const [requests, setRequests] = useState<RequestItem[]>([
        {
            id: '1',
            date: '2025-05-10',
            time: '17:20',
            productName: '클래식 하모니 블랜드',
            productId: 'A0005',
            blendRatio: '케냐 51% 코스타리카 49%',
            status: '대기',
            name: '이기홍',
            phone: '010-1234-1234',
            personalInfoAgreed: true,
            marketingAgreed: true,
        },
        {
            id: '2',
            date: '2025-05-10',
            time: '17:20',
            productName: '클래식 하모니 블랜드',
            productId: 'A0004',
            blendRatio: '케냐 51% 코스타리카 49%',
            status: '대기',
            name: '이기홍',
            phone: '010-1234-1234',
            personalInfoAgreed: true,
            marketingAgreed: true,
        },
        {
            id: '3',
            date: '2025-05-10',
            time: '15:35',
            productName: '클래식 하모니 블랜드',
            productId: 'A0002',
            blendRatio: '케냐 51% 코스타리카 49%',
            status: '수령 완료',
            name: '이기홍',
            phone: '010-1234-1234',
            personalInfoAgreed: true,
            marketingAgreed: true,
        },
        {
            id: '4',
            date: '2025-05-10',
            time: '15:35',
            productName: '클래식 하모니 블랜드',
            productId: 'A0001',
            blendRatio: '케냐 51% 코스타리카 49%',
            status: '수령 완료',
            name: '이기홍',
            phone: '010-1234-1234',
            personalInfoAgreed: true,
            marketingAgreed: true,
        },
    ]);

    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

    const filteredRequests = requests.filter((item) => {
        if (activeTab === '전체') return true;
        return item.status === activeTab;
    });

    const handleStatusClick = (itemId: string, currentStatus: '대기' | '수령 완료') => {
        // Faqat "대기" status bo'lgan button'lar uchun action sheet ochiladi
        if (currentStatus === '대기') {
            setSelectedRequestId(itemId);
            setIsActionSheetOpen(true);
        }
    };

    const handleConfirm = () => {
        if (selectedRequestId) {
            setRequests((prev) =>
                prev.map((item) =>
                    item.id === selectedRequestId
                        ? { ...item, status: '수령 완료' as const }
                        : item
                )
            );
        }
        setIsActionSheetOpen(false);
        setSelectedRequestId(null);
    };

    return (
        <div className="h-[100dvh] bg-background flex flex-col">
            <div className='flex justify-between items-center py-2.5 px-[26px]'>
                <button className='cursor-pointer' onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <p className='text-base font-bold text-gray-0 leading-[20px]'>시음 요청</p>
                <div className='w-6'></div>
            </div>
            <div className="flex items-center gap-2 px-4 py-3">
                {(['전체', '대기', '수령 완료'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`h-7 px-2.5 py-1 rounded-sm text-sm leading-[20px] font-bold cursor-pointer ${activeTab === tab
                            ? "bg-action-primary text-white"
                            : "bg-white text-action-primary border border-action-primary"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="px-4 pb-4">
                    <div className="space-y-5">
                        {filteredRequests.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-border-default py-3 px-4 text-gray-0"
                            >
                                <p className="text-[10px] font-bold leading-[16px] mb-4">{item.date} {item.time}</p>
                                <div className='border border-border-default rounded-2xl p-4 pb-3'>
                                    <div className="flex justify-between items-center gap-4 mb-3">
                                        <div>
                                            <p className="text-sm font-bold leading-[20px]">{item.productName}</p>
                                            <p className="text-sm font-bold leading-[20px] my-2">{item.productId}</p>
                                            <div className="flex items-center gap-1">
                                                <span className='text-[#FFE5BF] leading-[16px]'>•</span>
                                                <span className='text-xs leading-[16px] font-normal'>케냐 51%</span>
                                                <span className='text-[#FFE5BF] leading-[16px]'>•</span>
                                                <span className='text-xs leading-[16px] font-normal'>코스타리카 49%</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleStatusClick(item.id, item.status)}
                                            className={`h-7 px-3 py-1 rounded-sm text-xs font-bold leading-[16px] ${item.status === '수령 완료'
                                                ? 'bg-[#28A745] text-white'
                                                : 'bg-white border border-action-primary text-black cursor-pointer'
                                                }`}
                                        >
                                            {item.status}
                                        </button>
                                    </div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-xs font-normal leading-[18px]">이름</span>
                                        <span className="font-bold text-xs leading-[16px]">{item.name}</span>
                                    </div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-xs font-normal leading-[18px]">전화번호</span>
                                        <span className="font-bold text-xs leading-[16px]">{item.phone}</span>
                                    </div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-xs font-normal leading-[18px]">개인정보 수집 동의</span>
                                        <span className="font-bold text-xs leading-[16px]">
                                            {item.personalInfoAgreed ? 'Y' : 'N'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-xs font-normal leading-[18px]">앱 출시 알림 동의</span>
                                        <span className="font-bold text-xs leading-[16px]">
                                            {item.marketingAgreed ? 'Y' : 'N'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Status Change Action Sheet */}
            <ActionSheet
                isOpen={isActionSheetOpen}
                onClose={() => {
                    setIsActionSheetOpen(false);
                    setSelectedRequestId(null);
                }}
                title="상태를 변경합니다."
            >
                <div className="space-y-4 mt-6">
                    <button
                        className="btn-primary w-full mb-2"
                        onClick={handleConfirm}
                    >
                        확인
                    </button>
                    <button
                        className="btn-primary-outline w-full"
                        onClick={() => {
                            setIsActionSheetOpen(false);
                            setSelectedRequestId(null);
                        }}
                    >
                        취소
                    </button>
                </div>
            </ActionSheet>
        </div>
    );
}