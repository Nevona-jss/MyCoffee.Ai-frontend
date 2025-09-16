"use client";
import React from "react";
import {
  ChevronRight,
  Truck,
  Wifi,
  MessageSquare,
  Wallet,
  MapPin,
  HelpCircle,
} from "lucide-react";

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
            <p className="text-xl font-bold text-action-secondary">0원</p>
          </div>
          <button className="px-4 py-2 bg-action-primary text-white rounded-lg text-sm font-medium">
            이용 내역
          </button>
        </div>
      </div>

      {/* Quick Access Icons */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Order/Delivery Inquiry */}
        <div className="bg-white rounded-lg p-4 border border-border-default text-center">
          <div className="w-12 h-12 bg-action-secondary rounded-full flex items-center justify-center mx-auto mb-2">
            <Truck size={24} className="text-white" />
          </div>
          <p className="text-xs text-gray-0 font-medium">주문/배송 조회</p>
        </div>

        {/* Subscription Management */}
        <div className="bg-white rounded-lg p-4 border border-border-default text-center">
          <div className="w-12 h-12 bg-action-secondary rounded-full flex items-center justify-center mx-auto mb-2">
            <Wifi size={24} className="text-white" />
          </div>
          <p className="text-xs text-gray-0 font-medium">구독 관리</p>
        </div>

        {/* My Reviews */}
        <div className="bg-white rounded-lg p-4 border border-border-default text-center">
          <div className="w-12 h-12 bg-action-secondary rounded-full flex items-center justify-center mx-auto mb-2">
            <MessageSquare size={24} className="text-white" />
          </div>
          <p className="text-xs text-gray-0 font-medium">내리뷰</p>
        </div>
      </div>

      {/* Management List */}
      <div className="bg-white rounded-lg border border-border-default">
        {/* Payment Method Management */}
        <div className="flex items-center justify-between p-4 ">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <Wallet size={16} className="text-action-primary" />
            </div>
            <span className="text-sm text-action-primary font-bold">
              결제 수단 관리
            </span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        {/* Delivery Address Management */}
        <div className="flex items-center justify-between p-4 ">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <MapPin size={20} className="text-action-primary" />
            </div>
            <span className="text-sm text-action-primary font-bold">배송지 관리</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        {/* My Reviews */}
        <div className="flex items-center justify-between p-4  ">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <MessageSquare size={20} className="text-action-primary" />
            </div>
            <span className="text-sm text-action-primary font-bold">내 리뷰</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        {/* My Inquiries */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-secondary-accent-sub rounded-full flex items-center justify-center">
              <HelpCircle size={20} className="text-action-primary" />
            </div>
            <span className="text-sm text-action-primary font-bold">내 문의</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
