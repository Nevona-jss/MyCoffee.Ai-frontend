"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, ChevronRight, XIcon } from "lucide-react";
import Link from "next/link";
import BottomMenuBar from "@/components/BottomMenuBar";
import { useHeaderStore } from "@/stores/header-store";

const PurchaseIndividualItem = () => {
  const { setHeader } = useHeaderStore();
  const [quantity, setQuantity] = useState(1);
  const [pointUsage, setPointUsage] = useState(0);
  const [agreements, setAgreements] = useState({
    all: false,
    personalInfo: false,
    terms: false,
    marketing: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    orderInfo: true,
    deliveryInfo: true,
    pointUsage: true,
    paymentMethod: false,
    finalAmount: true,
  });

  useEffect(() => {
    setHeader({
      title: "주문하기",
      showBackButton: true,
    });
  }, [setHeader]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handlePointUsage = (type: "all" | "custom") => {
    if (type === "all") {
      setPointUsage(12000);
    }
  };

  const handleAgreementChange = (type: keyof typeof agreements) => {
    if (type === "all") {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        personalInfo: newValue,
        terms: newValue,
        marketing: newValue,
      });
    } else {
      setAgreements((prev) => ({
        ...prev,
        [type]: !prev[type],
        all: false,
      }));
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const productPrice = 36000;
  const deliveryFee = 0;
  const totalPrice = productPrice * quantity - pointUsage + deliveryFee;

  return (
    <>
      <Header />

      <div className="bg-background min-h-screen p-4 pb-14">
        <div className="space-y-4 ">
          {/* 주문 정보 (Order Information) */}
          <div className="bg-white rounded-lg p-3 border border-border-default">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("orderInfo")}
            >
              <h2 className="text-sm leading-[20px] font-bold">주문 정보</h2>
              {expandedSections.orderInfo ? (
                <ChevronUp size={24} className="text-icon-default" />
              ) : (
                <ChevronDown size={24} className="text-icon-default" />
              )}
            </div>

            {expandedSections.orderInfo && (
              <div className="border border-border-default rounded-lg p-3 mt-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-xs leading-[18px] text-gray-0">
                    나만의 커피 1호기/클래식 하모니 블랜드
                  </p>
                  <button>
                    <XIcon size={16} stroke="#1A1A1A" />
                  </button>
                </div>

                <div className="text-sm text-text-secondary mb-4 flex items-center gap-1">
                  {["카페인", "홀빈", "벌크", "500g", "라벨"].map(
                    (item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] leading-[16px] flex items-center gap-1"
                      >
                        {item}{" "}
                        {idx !== 4 && (
                          <span className="size-1 bg-[#FFE5BF] rounded-full inline-block"></span>
                        )}
                      </span>
                    )
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-[22px]">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="w-7 h-7 flex items-center justify-center border border-border-default rounded cursor-pointer"
                    >
                      <span className="w-[12px] h-[2px] bg-[#4E2A18] rounded-full inline-block"></span>
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="w-7 h-7 flex items-center justify-center bg-amber-800 text-white rounded cursor-pointer"
                    >
                      <svg
                        width="12"
                        height="12"
                        fill="none"
                        stroke="#FFF"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="text-base font-bold leading-[24px]">
                    {productPrice.toLocaleString()}원
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 배송지 정보 (Delivery Information) */}
          <div className="bg-white rounded-lg p-3 border border-border-default">
            <div className="flex items-center justify-between cursor-pointer">
              <h2 className="text-sm leading-[20px] font-bold">배송지 정보</h2>
              <span className="text-[10px] leading-[16px] text-[#3182F6] font-bold">
                변경
              </span>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <div className="w-8 h-8 bg-action-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/location.svg"
                  alt="location icon"
                  width={16}
                />
              </div>

              <div className="flex-1">
                <p className="text-xs leading-[18px] font-bold">
                  이기홍 01012341234
                </p>
                <p className="text-xs leading-[18px] font-bold">
                  인천 부평구 길주남로123번길 12
                </p>
              </div>
            </div>
          </div>

          {/* 포인트 사용 (Point Usage) */}
          <div className="bg-white rounded-lg p-3 border border-border-default">
            <div
              className="flex items-center justify-between  cursor-pointer"
              onClick={() => toggleSection("pointUsage")}
            >
              <h2 className="text-sm leading-[20px] font-bold ">포인트 사용</h2>
              {expandedSections.pointUsage ? (
                <ChevronUp size={24} className="text-icon-default" />
              ) : (
                <ChevronDown size={24} className="text-icon-default" />
              )}
            </div>

            {expandedSections.pointUsage && (
              <div className=" mt-2">
                <span className="text-xs leading-[18px] font-bold">
                  보유 포인트 12,000
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    value={pointUsage}
                    onChange={(e) => setPointUsage(Number(e.target.value))}
                    className="flex-1 h-10 pl-3 border border-border-default rounded-lg text-left text-sm placeholder:text-text-secondary"
                    placeholder="0"
                  />
                  <button
                    onClick={() => handlePointUsage("all")}
                    className=" h-10 px-4 py-2.5 border border-action-primary  text-action-primary rounded-lg text-sm leading-[20px] font-bold"
                  >
                    전액 사용
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 결제수단 (Payment Method) */}
          <div className="bg-white rounded-lg p-3 border border-border-default">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("paymentMethod")}
            >
              <h2 className="text-sm leading-[20px] font-bold ">결제수단</h2>
              {expandedSections.paymentMethod ? (
                <ChevronUp size={24} className="text-icon-default" />
              ) : (
                <ChevronDown size={24} className="text-icon-default" />
              )}
            </div>
            {expandedSections.paymentMethod && (
              <div className="mt-4">
                <p className="text-sm text-text-secondary"></p>
              </div>
            )}
          </div>

          {/* 최종 결제금액 (Final Payment Amount) */}
          <div className="bg-white rounded-lg p-3 border border-border-default">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("finalAmount")}
            >
              <h2 className="text-sm leading-[20px] font-bold ">
                최종 결제금액
                <span className=" ml-2 bg-brand-secondary-accent-sub text-action-secondary px-2 py-1 rounded-sm font-bold">
                  36,000원
                </span>
              </h2>
              {expandedSections.finalAmount ? (
                <ChevronUp size={24} className="text-icon-default" />
              ) : (
                <ChevronDown size={24} className="text-icon-default" />
              )}
            </div>

            {expandedSections.finalAmount && (
              <>
                <div className="space-y-2  mt-2">
                  <div className="flex justify-between">
                    <span className="text-xs leading-[18px] font-normal">
                      상품금액
                    </span>

                    <span className="text-xs leading-[18px] font-bold">
                      {(productPrice * quantity).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs leading-[18px] font-normal">
                      배송비
                    </span>
                    <span className="text-xs leading-[18px] font-bold">
                      {deliveryFee.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs leading-[18px] font-normal">
                      포인트 할인
                    </span>
                    <span className="text-xs leading-[18px] font-bold">
                      {pointUsage.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 약관 동의 (Terms and Conditions) */}
          <div className="bg-white rounded-lg p-3 border border-border-default">
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.all}
                  onChange={() => handleAgreementChange("all")}
                  className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                />
                <span className="text-sm leading-[22px] font-normal ">
                  구매조건/약관 및 개인정보 이용 전체 동의
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.personalInfo}
                  onChange={() => handleAgreementChange("personalInfo")}
                  className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                />
                <span className="text-sm leading-[22px] font-normal ">
                  개인정보 수집 및 이용 동의 (필수)
                </span>
                <ChevronRight size={20} className="ml-auto text-icon-default" />
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.terms}
                  onChange={() => handleAgreementChange("terms")}
                  className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                />
                <span className="text-sm leading-[22px] font-normal ">
                  이용약관 동의 (필수)
                </span>
                <ChevronRight size={20} className="ml-auto text-icon-default" />
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.marketing}
                  onChange={() => handleAgreementChange("marketing")}
                  className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                />
                <span className="text-sm leading-[22px] font-normal ">
                  개인정보 마케팅 활용 동의 (선택)
                </span>
                <ChevronRight size={20} className="ml-auto text-icon-default" />
              </label>
            </div>
          </div>
        </div>

        {/* 주문하기 버튼 (Order Button) */}

        {/* shu elementni */}

        <div className="pt-4 w-full ">
          {/* <div className="fixed left-[50%] translate-x-[-50%] pb-4 pt-4 px-4 bottom-0 w-full max-w-sm bg-background"> */}
          {/* if chekcbox not clicked then button will be disabled */}
          {agreements.all ||
          agreements.personalInfo ||
          agreements.terms ||
          agreements.marketing ? (
            <>
              <Link
                href={"/success-order"}
                className="w-full inline-block text-center py-3 border border-transparent bg-linear-gradient text-white rounded-lg font-bold leading-[24px]"
              >
                주문하기
              </Link>
            </>
          ) : (
            <button className="w-full py-3 border border-transparent bg-action-disabled text-text-disabled rounded-lg font-bold leading-[24px] cursor-not-allowed">
              주문하기
            </button>
          )}
        </div>
      </div>
      <BottomMenuBar />
    </>
  );
};

export default PurchaseIndividualItem;
