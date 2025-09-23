"use client";
import { useHeaderStore } from "@/stores/header-store";
import { Link } from "lucide-react";
import React, { useEffect } from "react";

const Bullet = () => (
  <span className="inline-block w-1 h-1 bg-gray-0 rounded-full mr-2 ml-1 translate-y-[-2px]" />
);
const ApplyTermDetail = () => { 
  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "개인정보 마케팅 활용 동의",
      showBackButton: true,
    });
  }, []);
  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl border border-border-default p-3">
        {/* Title */}
        <h1 className="text-base leading-[20px] font-bold text-gray-0 mb-4">
          개인정보 마케팅 활용 동의
        </h1>

        {/* Top bullet description */}
        <p className="text-xs leading-[18px] mb-4">
          <Bullet />
          마케팅 정보(이벤트·혜택·추천상품)를 푸시·SMS·이메일로 보내드리는 것에
          동의합니다.
        </p>

        {/* 1. 이용 목적 */}
        <section className="mb-4">
          <p className="text-[10px] leading-[16px] font-normal mb-2">
            1. 이용 목적
          </p>
          <ol className="space-y-1 text-[10px] leading-[16px] pl-4">
            <li> a. 신규 서비스 및 이벤트 안내</li>
            <li> b. 할인/프로모션 등 마케팅 정보 제공</li>
            <li> c. 맞춤형 상품 및 서비스 추천</li>
          </ol>
        </section>

        {/* 2. 수단 항목 */}
        <section className="mb-4">
          <p className="text-[10px] leading-[16px] font-normal mb-2">
            2. 수단 항목
          </p>
          <ol className="space-y-1 text-[10px] leading-[16px] pl-4">
            <li> a. 푸시 알림(APP)</li>
            <li> b. 문자메세지(SMS/MMS)</li>
            <li> c. 이메일</li>
          </ol>
        </section>

        {/* 3. 보유 및 이용 기간 */}
        <section className="mb-4">
          <p className="text-[10px] leading-[16px] font-normal mb-2">
            3. 보유 및 이용 기간
          </p>
          <ol className="space-y-1 text-[10px] leading-[16px] pl-4">
            <li> a. 동의일로부터 회원 탈퇴 또는 동의 철회시 까지</li>
            <li> b. 법령에 따른 보존 필요 시 해당 기간 준수</li>
          </ol>
        </section>

        {/* Bottom note */}
        <p className="text-xs leading-[18px]">
          <Bullet />본 동의는 선택 사항으로, 고객님은 이를 거부하실 권리가
          있습니다. 다만, 거부 시 다양한 혜택 및 이벤트 알림을 받아보실 수
          없습니다.
        </p>
      </div>
    </div>
  );
};

export default ApplyTermDetail;
