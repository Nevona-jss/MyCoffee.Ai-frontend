"use client";
import React from "react";
import {
  ChevronRight,
  Truck,
  MessageSquareDot,
  MapPinHouse,
  MessageSquareMore,
  BadgeAlert,
} from "lucide-react";
import Link from "next/link";

const MyPage = () => {
  return (
    <div className="bg-background p-4">
      {/* User Information Card */}
      <div className="bg-white rounded-2xl p-3 mb-4 border border-border-default">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-base font-bold leading-[20px]">이기홍</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] leading-[16px]">1235017601</span>
              <div className="flex items-center gap-1 px-2 py-1 bg-black/5 rounded text-[10px]">
                <img src="/images/kakao.png" alt="kakao" className="w-4 h-4" />
                <span className="text-gray-0 font-medium">카카오</span>
              </div>
            </div>
          </div>
          <ChevronRight size={24} className="text-icon-default" />
        </div>
      </div>

      {/* My Points Card */}
      <div className="bg-brand-secondary-accent-sub rounded-2xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] leading-[16px] text-text-secondary mb-1">
              나의 포인트
            </p>
            <p className="text-base leading-[20px] font-bold text-action-secondary">
              0원
            </p>
          </div>
          <button className="px-3.5 py-1.5 bg-action-primary text-white rounded-sm text-sm font-bold">
            이용 내역
          </button>
        </div>
      </div>

      {/* Quick Access Icons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Order/Delivery Inquiry */}
        <Link href="/profile/order-delivery" className="bg-white rounded-2xl p-3 border border-border-default text-center">
          <div className="w-11 h-11 bg-action-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <Truck size={24} className="text-white" />
          </div>
          <p className="text-xs leading-[16px] font-bold">주문/배송 조회</p>
        </Link>

        {/* Subscription Management */}
        <Link href="/profile/manage-subscriptions" className="bg-white rounded-2xl p-3 border border-border-default text-center">
          <div className="w-11 h-11 bg-action-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <img src="/icons/wifi.svg" alt="wifi" className="w-6 h-6" />
          </div>
          <p className="text-xs leading-[16px] font-bold">구독 관리</p>
        </Link>

        {/* My Reviews */}
        <div className="bg-white rounded-2xl p-3 border border-border-default text-center">
          <div className="w-11 h-11 bg-action-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            {/* <MessageSquare size={24} className="text-white" /> */}

            <MessageSquareDot size={24} className="text-white" />
          </div>
          <p className="text-xs leading-[16px] font-bold">내리뷰</p>
        </div>
      </div>

      {/* Management List */}
      <div className="bg-white rounded-2xl border border-border-default p-3">
        {/* Payment Method Management */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <img src="/icons/wallet.svg" alt="wallet" className="w-5 h-5" />
            </div>
            <span className="text-sm leading-[20px] font-bold">
              결제 수단 관리
            </span>
          </div>
          <ChevronRight size={20} className="text-icon-default" />
        </div>

        {/* Delivery Address Management */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <MapPinHouse size={20} className="text-action-primary" />
            </div>
            <span className="text-sm leading-[20px] font-bold">
              배송지 관리
            </span>
          </div>
          <ChevronRight size={20} className="text-icon-default" />
        </div>

        {/* My Reviews */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <MessageSquareMore size={20} className="text-action-primary" />
            </div>
            <span className="text-sm leading-[20px] font-bold">내 리뷰</span>
          </div>
          <ChevronRight size={20} className="text-icon-default" />
        </div>

        {/* My Inquiries */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <BadgeAlert size={20} className="text-action-primary" />
            </div>
            <span className="text-sm leading-[20px] font-bold">내 문의</span>
          </div>
          <ChevronRight size={20} className="text-icon-default" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
