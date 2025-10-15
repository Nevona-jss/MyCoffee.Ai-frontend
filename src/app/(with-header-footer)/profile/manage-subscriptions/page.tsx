"use client";

import { useHeaderStore } from "@/stores/header-store";
import Link from "next/link";
import { useEffect, useState } from "react";

const ManageSubscriptions = () => {
    const [activeTag, setActiveTag] = useState("전체");

    const { setHeader } = useHeaderStore();

    useEffect(() => {
      setHeader({
        title: "구독 관리",
      });
    }, []);

    const tags = [
        { id: "전체", label: "전체" },
        { id: "구독", label: "구독" },
        { id: "일시정지", label: "일시정지" },
        { id: "종료", label: "종료" },
    ];

    // Demo data for subscription cards
    const subscriptionData = [
        {
            id: 1,
            status: "구독",
            statusColor: "bg-[#28A745]",
            statusTextColor: "text-white",
            title: "나만의 커피 1호기",
            subtitle: "(클래식 하모니 블랜드)",
            details: ["카페인", "홀빈", "벌크", "500g", "1개"],
            price: "36,000원",
            subscriptionCount: "1/4",
            nextPaymentDate: "2025년 10월 01일 (화)",
            nextDeliveryDate: "2025년 10월 03일 (목)",
            deliveryName: "이기홍",
            deliveryAddress: "인천 부평구 길주남로 113번길 12 동아아파트 2동 512호",
            phone: "010-2934-3017",
            buttons: ["결제 수단 관리"]
        },
        {
            id: 2,
            status: "일시정지",
            statusColor: "bg-[rgba(0,0,0,0.05)]",
            statusTextColor: "text-black",
            title: "나만의 커피 1호기",
            subtitle: "(클래식 하모니 블랜드)",
            details: ["카페인", "홀빈", "벌크", "500g", "1개"],
            price: "36,000원",
            subscriptionCount: "1/4",
            nextPaymentDate: "2025년 10월 01일 (화)",
            nextDeliveryDate: "2025년 10월 03일 (목)",
            deliveryName: "이기홍",
            deliveryAddress: "인천 부평구 길주남로 113번길 12 동아아파트 2동 512호",
            phone: "010-2934-3017",
            buttons: ["결제 수단 관리", "재개하기"]
        },
        {
            id: 3,
            status: "종료",
            statusColor: "bg-[#17A2B8]",
            statusTextColor: "text-white",
            title: "나만의 커피 1호기",
            subtitle: "(클래식 하모니 블랜드)",
            details: ["카페인", "홀빈", "벌크", "500g", "1개"],
            price: "36,000원",
            subscriptionCount: "1/4",
            nextPaymentDate: "2025년 10월 01일 (화)",
            nextDeliveryDate: "2025년 10월 03일 (목)",
            deliveryName: "이기홍",
            deliveryAddress: "인천 부평구 길주남로 113번길 12 동아아파트 2동 512호",
            phone: "010-2934-3017",
            buttons: ["선택"]
        }
    ];

    // Filter data based on active tag
    const filteredData = activeTag === "전체"
        ? subscriptionData
        : subscriptionData.filter(item => item.status === activeTag);

    return (
        <div className="p-4">
            {/* Tags */}
            <div className="flex gap-2 mb-4">
                {tags.map((tag) => (
                    <button
                        key={tag.id}
                        onClick={() => setActiveTag(tag.id)}
                        className={`px-[9px] py-[3px] cursor-pointer rounded-sm text-sm leading-[20px] font-bold transition-all duration-200 whitespace-nowrap ${activeTag === tag.id
                            ? "bg-linear-gradient text-white border border-action-primary"
                            : "bg-white text-action-primary border border-action-primary"
                            }`}
                    >
                        {tag.label}
                    </button>
                ))}
            </div>

            {/* Subscription Cards */}
            <div className="space-y-4 text-gray-0">
                {filteredData.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl px-4 py-3 border border-border-default">
                        {/* Header with status */}
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h3 className="text-sm font-bold">
                                    {item.title}
                                </h3>
                                <p className="text-[12px] font-bold mt-1">
                                    {item.subtitle}
                                </p>
                            </div>
                            <div className={`px-2 py-1 rounded-lg h-6 flex items-center justify-center ${item.statusColor}`}>
                                <span className={`text-xs font-medium ${item.statusTextColor}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>

                        {/* Product details and price */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-text-secondary flex items-center gap-1">
                                {["카페인", "홀빈", "벌크", "500g", "라벨"].map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[12px] leading-[16px] flex items-center gap-1"
                                    >
                                        {item}{" "}
                                        {idx !== 4 && (
                                            <span className="size-1 bg-[#FFE5BF] rounded-full inline-block"></span>
                                        )}
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm font-bold">{item.price}</span>
                        </div>

                        {/* Subscription info */}
                        <div className="space-y-2 mb-4 text-xs">
                            <div className="flex justify-between">
                                <span className="">구독 횟수</span>
                                <span className="font-bold">{item.subscriptionCount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="">다음 결제일</span>
                                <span className="font-bold">{item.nextPaymentDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="">다음 배송일</span>
                                <span className="font-bold">{item.nextDeliveryDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="">배송지</span>
                                <span className="font-bold">이기홍</span>
                            </div>
                        </div>

                        {/* Delivery info */}
                        <div className="mb-4">
                            <div className="space-y-1 text-text-secondary">
                                <p className="text-xs font-normal text-right leading-[18px]">인천 부평구 길주남로 113번길 12</p>
                                <p className="text-xs font-normal text-right leading-[18px]">동아아파트 2동 512호</p>
                                <p className="text-xs font-normal text-right leading-[18px]">010-2934-3017</p>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between gap-2">
                            {item.buttons.map((buttonText, index) => (
                                <Link
                                    key={index}
                                    href={`/profile/manage-subscriptions/${item.id}`}
                                    className={`flex-1 py-[5px] border border-action-primary text-center text-action-primary rounded-sm font-bold text-sm leading-[20px] ${buttonText !== "재개하기" ? "bg-[#FFE5BF]" : ""}`}
                                >
                                    {buttonText}
                                </Link>
                            ))}
                            <button className="cursor-pointer size-8 border border-action-primary rounded-sm flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3.3335 4.1665H16.6668" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.3335 10H16.6668" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.3335 15.8335H16.6668" stroke="#4E2A18" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ManageSubscriptions;