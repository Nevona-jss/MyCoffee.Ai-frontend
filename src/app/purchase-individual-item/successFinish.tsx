"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SuccessFinish = () => {
  const router = useRouter();

  const handleMainHome = () => {
    router.push("/home");
  };

  const handleOrderDetails = () => {
    // Navigate to order details page
    console.log("View order details");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <svg
          width="40"
          height="40"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Success Messages */}
      <div className="text-center mb-12">
        <h1 className="text-xl font-bold text-gray-0 mb-2">
          구매가 완료되었습니다.
        </h1>
        <p className="text-base text-text-secondary">
          오늘도 향긋한 하루 되세요.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-3">
        {/* Main Home Button */}
        <button
          onClick={handleMainHome}
          className="w-full py-4 bg-linear-gradient text-white rounded-lg font-bold text-base"
        >
          메인홈으로
        </button>

        {/* Order Details Link */}
        <button
          onClick={handleOrderDetails}
          className="w-full py-3 text-gray-0 text-base font-normal"
        >
          주문 상세 보기
        </button>
      </div>
    </div>
  );
};

export default SuccessFinish;
