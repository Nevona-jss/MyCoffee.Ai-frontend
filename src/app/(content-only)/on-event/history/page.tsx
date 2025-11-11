'use client';

import Header from '@/components/Header';
import ActionSheet from '@/components/ActionSheet';
import { useHeaderStore } from '@/stores/header-store';
import { useEffect, useState } from 'react';
import HistoryCard from './components/HistoryCard';

type HistoryItem = {
    id: string;
    type: '시음' | '원두 주문';
    itemName: string;
    status: string;
    statusColor?: string;
    identifier: string;
    date: string;
    time: string;
    options?: string;
    price?: string;
    name?: string;
    phone?: string;
    deliveryAddress?: string;
};

export default function OnEventHistoryPage() {

    const { setHeader } = useHeaderStore();
    

    useEffect(() => {
        setHeader({
            title: '조회',
        });
      }, []);

    const [historyItems] = useState<HistoryItem[]>([
        {
            id: '1',
            type: '시음',
            itemName: '클래식 하모니 블랜드',
            status: '대기',
            identifier: 'A0001',
            date: '2025-05-10',
            time: '15:35',
            name: '이기홍',
            phone: '010-1234-1234',
        },
        {
            id: '2',
            type: '시음',
            itemName: '클래식 하모니 블랜드',
            status: '수령 완료',
            statusColor: '#28A745',
            identifier: 'A0002',
            date: '2025-05-10',
            time: '15:35',
            name: '이기홍',
            phone: '010-1234-1234',
        },
        {
            id: '3',
            type: '원두 주문',
            itemName: '클래식 하모니 블랜드',
            status: '결제 대기',
            identifier: 'B0001',
            date: '2025-05-10',
            time: '15:35',
            price: '36,000',
            name: '이기홍',
            phone: '010-1234-1234',
            deliveryAddress: '서울시 강동구 암사동 ○○아파트 102동 1002호',
        },
        {
            id: '4',
            type: '원두 주문',
            itemName: '클래식 하모니 블랜드',
            status: '결제 완료',
            statusColor: '#28A745',
            identifier: 'B0002',
            date: '2025-05-10',
            time: '15:35',
            price: '36,000',
            name: '이기홍',
            phone: '010-1234-1234',
            deliveryAddress: '서울시 강동구 암사동 ○○아파트 102동 1002호',
        },
    ]);

    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

    
    return (
        <>
            <div className="h-[100dvh] bg-background flex flex-col">
                <Header />
                <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                    <div className="px-4 py-4">
                        <div className="space-y-4">
                            {[...historyItems, ...historyItems, ...historyItems].map((item, key) => (
                                <HistoryCard
                                    key={key}
                                    item={item}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setIsActionSheetOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Information Action Sheet */}
            <ActionSheet
                isOpen={isActionSheetOpen}
                onClose={() => setIsActionSheetOpen(false)}
                title="상세 정보"
            >
                {selectedItem && (
                    <div className="space-y-3 mt-3">
                        {selectedItem.price && (
                            <div className="border border-border-default rounded-2xl py-3 px-4">
                                <p className="text-sm font-bold text-gray-0 mb-3 leading-[20px]">
                                    {selectedItem.itemName}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className='text-xs leading-[16px] font-normal text-text-secondary'>카페인</span>
                                        <span className='text-[#9CA3AF]'>•</span>
                                        <span className='text-xs leading-[16px] font-normal text-text-secondary'>홀빈</span>
                                        <span className='text-[#9CA3AF]'>•</span>
                                        <span className='text-xs leading-[16px] font-normal text-text-secondary'>벌크</span>
                                        <span className='text-[#9CA3AF]'>•</span>
                                        <span className='text-xs leading-[16px] font-normal text-text-secondary'>500g</span>
                                        <span className='text-[#9CA3AF]'>•</span>
                                        <span className='text-xs leading-[16px] font-normal text-text-secondary'>1개</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-0 leading-[20px]">
                                        {selectedItem.price}원
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="border border-border-default rounded-2xl py-3 px-4 text-gray-0">
                            <p className="text-sm font-bold mb-3 leading-[20px]">주문정보</p>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="leading-[18px] font-normal">주문번호</span>
                                    <span className="font-bold leading-[16px]">{selectedItem.identifier}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="leading-[18px] font-normal">요청 일자</span>
                                    <span className="font-bold leading-[16px]">{selectedItem.date} {selectedItem.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="leading-[18px] font-normal">요청 커피</span>
                                    <span className="font-bold leading-[16px]">{selectedItem.itemName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="leading-[18px] font-normal">상태</span>
                                    <span 
                                        className="font-bold leading-[16px]"
                                        style={{ color: selectedItem.statusColor || undefined }}
                                    >
                                        {selectedItem.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="border border-border-default rounded-2xl py-3 px-4 text-gray-0 mb-6">
                            <p className="text-sm font-bold mb-3 leading-[20px]">기본 정보</p>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="leading-[18px] font-normal">이름</span>
                                    <span className="font-bold leading-[16px]">{selectedItem.name || '이기홍'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="leading-[18px] font-normal">전화번호</span>
                                    <span className="font-bold leading-[16px]">{selectedItem.phone || '010-1234-1234'}</span>
                                </div>
                                {selectedItem.deliveryAddress && (
                                    <div className="flex justify-between">
                                        <span className="leading-[18px] font-normal">배송지 주소</span>
                                        <span className="font-bold leading-[16px] text-right">{selectedItem.deliveryAddress}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                            className="btn-primary-outline w-full"
                            onClick={() => setIsActionSheetOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                )}
            </ActionSheet>
        </>
    );
}
