"use client";
import React, { useState } from "react";

const Ordering = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false);
    // Trigger opening animation
    setTimeout(() => {
      setIsOpening(true);
    }, 10); // Small delay to ensure DOM is ready
  };
  
  const closeModal = () => {
    setIsClosing(true);
    setIsOpening(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };
  
  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="p-4 min-h-[100dvh]">
      <button onClick={openModal} className="btn-primary block w-full mb-0">
        주문하기
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end transition-all duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleClose}
        >
          {/* Modal Content */}
          <div
            className={`bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-out ${
              isClosing ? "translate-y-full" : isOpening ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-6">
              내 커피 이름
            </h2>

            {/* Option Dropdowns */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <select className="w-full p-4 border border-gray-300 rounded-lg appearance-none bg-white">
                  <option>옵션을 선택해주세요.</option>
                  <option>클래식 하모니 블랜드</option>
                  <option>프리미엄 아로마</option>
                  <option>스페셜 블렌드</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select className="w-full p-4 border border-gray-300 rounded-lg appearance-none bg-white">
                  <option>라벨 옵션을 선택해주세요.</option>
                  <option>기본 라벨</option>
                  <option>프리미엄 라벨</option>
                  <option>커스텀 라벨</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Selected Item Display */}
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900">
                  나만의 커피 1호기/클래식 하모니 블랜드
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                카페인 • 홀빈 • 벌크 • 500g • 라벨
              </div>

              <div className="flex justify-between items-center">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-3">
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                    -
                  </button>
                  <span className="text-lg font-medium">1</span>
                  <button className="w-8 h-8 flex items-center justify-center bg-amber-800 text-white rounded hover:bg-amber-900">
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-lg font-semibold text-gray-900">
                  36,000원
                </div>
              </div>
            </div>

            {/* Final Payment Amount */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">최종 결제금액</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-semibold">
                36,000원
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 py-4 border-2 border-amber-800 text-amber-800 rounded-lg font-medium hover:bg-amber-50 transition-colors">
                정기구독
              </button>
              <button className="flex-1 py-4 bg-amber-800 text-white rounded-lg font-medium hover:bg-amber-900 transition-colors">
                단품 구매
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordering;
