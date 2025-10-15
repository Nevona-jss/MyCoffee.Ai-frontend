"use client";
import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, ChevronRight, XIcon } from "lucide-react";
import { useHeaderStore } from "@/stores/header-store";
import { useOrderStore } from "@/stores/order-store";
import { usePost } from "@/hooks/useApi";
import { useUserStore } from "@/stores/user-store";
import { useParams } from "next/navigation";
const PurchaseIndividualItem = () => {

  const { order, increaseQuantity, decreaseQuantity, removeItem } = useOrderStore();
  const { user } = useUserStore();
  const params = useParams();
  const { setHeader } = useHeaderStore();
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
    subscriptionInfo: true,
  });

  useEffect(() => {
    setHeader({
      title: "주문하기",
      showBackButton: true,
    });
  }, [setHeader]);

  const handleQuantityChange = (index: number, type: "increase" | "decrease") => {
    if (type === "increase") {
      increaseQuantity(index);
    } else if (type === "decrease") {
      decreaseQuantity(index);
    }
  };

  const availablePoints = 12000;

  const handlePointUsage = (type: "all" | "custom") => {
    if (type === "all") {
      // Use minimum of available points and total product price
      const maxUsablePoints = Math.min(availablePoints, totalProductPrice);
      setPointUsage(maxUsablePoints);
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

  // Calculate total from all items in the order
  const totalProductPrice = order.reduce((sum, item) => {
    return sum + (item.price || productPrice) * (item.quantity || 1);
  }, 0);

  const totalPrice = totalProductPrice - pointUsage + deliveryFee;


  const { mutate: orderSingle, isPending: isCreatingOrder } = usePost('/orders/single');

  // Handle form submission
  const submitOder = () => {
    orderSingle({
      user_id: user?.data?.user_id,
      collection_id: 1001,
      analysis_id: 2001,
      order_items: [
        {
          coffee_blend_id: "BLEND_001",
          collection_name: "내 컬렉션",
          caffeine_type: "DECAF",
          grind_type: "WHOLE_BEAN",
          package_type: "BAG",
          weight_option: "250G",
          quantity: 2,
          unit_price: 15000,
          total_price: 30000,
          has_custom_label: false
        }
      ],
      recipient_name: "홍길동",
      recipient_phone: "010-1234-5678",
      postal_code: "12345",
      address: "서울시 강남구 테헤란로 123",
      address_detail: "456호",
      point_discount: 1000,
      shipping_fee: 3000,
      payment_method: "CARD",
      agreements: [
        {
          key: "TERMS_OF_SERVICE",
          agreed: true,
          version: "1.0"
        }
      ]
    });
  }

  return (
    <>
      <div className="bg-background p-4 pb-2 flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto h-[calc(100vh-246px)]">
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
              order.map((item, idx) => (
                <div key={idx} className="border border-border-default rounded-lg p-3 mt-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-xs leading-[18px] text-gray-0">
                      나만의 커피 {idx + 1}호기/클래식 하모니 블랜드
                    </p>
                    <button onClick={() => removeItem(idx)}>
                      <XIcon size={16} stroke="#1A1A1A" />
                    </button>
                  </div>

                  <div className="text-sm text-text-secondary mb-4 flex items-center gap-1">
                    {[item?.caffeineStrength === "CAFFEINE" ? "카페인" : "데카페인", item?.grindLevel === "WHOLE_BEAN" ? "홀빈" : "분쇄 그라인딩", item?.packaging === "STICK" ? "스틱" : "벌크", item.weight, "라벨"].map(
                      (option, optionIdx) => (
                        <span
                          key={optionIdx}
                          className="text-[10px] leading-[16px] flex items-center gap-1"
                        >
                          {option}{" "}
                          {optionIdx !== 4 && (
                            <span className="size-1 bg-[#FFE5BF] rounded-full inline-block"></span>
                          )}
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-[22px]">
                      <button
                        onClick={() => handleQuantityChange(idx, "decrease")}
                        className="w-7 h-7 flex items-center justify-center border border-border-default rounded cursor-pointer"
                      >
                        <span className="w-[12px] h-[2px] bg-action-primary rounded-full inline-block"></span>
                      </button>
                      <span className="text-lg font-medium">{item?.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(idx, "increase")}
                        className="w-7 h-7 flex items-center justify-center bg-linear-gradient text-white rounded cursor-pointer"
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
                      {((item.price || productPrice) * (item.quantity || 1)).toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 구독 정보 ( Subscription Information) */}
          {/* <div className="bg-white rounded-lg p-3 border border-border-default">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("subscriptionInfo")}
            >
              <h2 className="text-sm leading-[20px] font-bold">구독 정보</h2>
              {expandedSections.subscriptionInfo ? (
                <ChevronUp size={24} className="text-icon-default" />
              ) : (
                <ChevronDown size={24} className="text-icon-default" />
              )}
            </div>

            {expandedSections.subscriptionInfo && (
              <div className="mt-2">
                <ul className="space-y-2 text-xs leading-[18px]">
                  <li className="flex justify-between items-center">
                    <span className="font-normal">첫 배송 희망일</span>
                    <span className="font-bold">9월 3일(수)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-normal">1회차 결제일</span>
                    <span className="font-bold">9월 1일(월)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-normal">이용 횟수</span>
                    <span className="font-bold">총 4회</span>
                  </li>
                </ul>
              </div>
            )}
          </div> */}

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
                <span className="text-xs leading-[16px] font-bold">
                  보유 포인트 {availablePoints.toLocaleString()}
                </span>
                <div className="flex items-center gap-2 mt-2">

                  <input
                    type="number"
                    value={pointUsage > 0 ? pointUsage : ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      const maxUsablePoints = Math.min(availablePoints, totalProductPrice);
                      setPointUsage(Math.min(value, maxUsablePoints));
                    }}
                    className="flex-1 h-10 pl-3 border border-border-default rounded-lg text-left text-xs placeholder:text-text-secondary"
                    placeholder="사용할 포인트를 입력해주세요."
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
                  {totalPrice.toLocaleString()}원
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
                      {totalProductPrice.toLocaleString()}원
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
                      -{pointUsage.toLocaleString()}원
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
                <span className="text-xs leading-[16px] font-normal ">
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
                <span className="text-xs leading-[16px] font-normal ">
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
                <span className="text-xs leading-[16px] font-normal ">
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
                <span className="text-xs leading-[16px] font-normal ">
                  개인정보 마케팅 활용 동의 (선택)
                </span>
                <ChevronRight size={20} className="ml-auto text-icon-default" />
              </label>
            </div>
          </div>
        </div>
        <div className="pt-4 w-full ">
          <button 
            disabled={isCreatingOrder || !agreements.all || !agreements.personalInfo || !agreements.terms || !agreements.marketing} 
            onClick={submitOder} 
            className="w-full  btn-primary"
          >
            주문하기
          </button>
          {/* {agreements.all ||
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
            <button className="w-full  btn-primary">
              주문하기
            </button>
          )} */}
        </div>
      </div>
    </>
  );
};

export default PurchaseIndividualItem;
