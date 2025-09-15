import ActionSheet from "@/components/ActionSheet";
import React, { useState } from "react";

interface OrderSelectOptionProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderSelectOption: React.FC<OrderSelectOptionProps> = ({
  isOpen,
  onClose,
}) => {
  const [caffeineIntensity, setCaffeineIntensity] = useState<
    "caffeine" | "decaf" | ""
  >("");
  const [grindLevel, setGrindLevel] = useState<"whole" | "ground" | "">("");
  const [packaging, setPackaging] = useState<"stick" | "bulk" | "">("");
  const [weight, setWeight] = useState<string>("");

  const isButtonsDisabled =
    caffeineIntensity === "" ||
    grindLevel === "" ||
    packaging === "" ||
    weight === "";

  const handleComplete = () => {
    // Handle selection completion
    onClose();
  };

  return (
    <>
      <ActionSheet isOpen={isOpen} onClose={onClose} title="내 커피 이름">
        <div className="space-y-4 mt-4">
          {/* 카페인 강도 (Caffeine Intensity) */}
          <div>
            <h3 className="text-sm leading-[20px] font-bold mb-2">
              카페인 강도
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCaffeineIntensity("caffeine")}
                className={`flex-1 h-[40px] leading-[40px] inline-block text-xs rounded-lg border transition-colors ${
                  caffeineIntensity === "caffeine"
                    ? "border-action-secondary font-bold"
                    : "border-border-default text-text-secondary"
                }`}
              >
                카페인
              </button>
              <button
                onClick={() => setCaffeineIntensity("decaf")}
                className={`flex-1 h-[40px] leading-[40px] inline-block text-xs rounded-lg border transition-colors ${
                  caffeineIntensity === "decaf"
                    ? "border-action-secondary font-bold"
                    : "border-border-default text-text-secondary"
                }`}
              >
                디카페인
              </button>
            </div>
          </div>

          {/* 분쇄 정도 (Grind Level) */}
          <div>
            <h3 className="text-sm leading-[20px] font-bold mb-2">분쇄 정도</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setGrindLevel("whole")}
                className={`flex-1 h-[40px] leading-[40px] inline-block text-xs rounded-lg border transition-colors ${
                  grindLevel === "whole"
                    ? "border-action-secondary font-bold"
                    : "border-border-default text-text-secondary"
                }`}
              >
                홀빈
              </button>
              <button
                onClick={() => setGrindLevel("ground")}
                className={`flex-1 h-[40px] leading-[40px] inline-block text-xs rounded-lg border transition-colors ${
                  grindLevel === "ground"
                    ? "border-action-secondary font-bold"
                    : "border-border-default text-text-secondary"
                }`}
              >
                분쇄 그라인딩
              </button>
            </div>
          </div>

          {/* 포장 방법 (Packaging Method) */}
          <div>
            <h3 className="text-sm leading-[20px] font-bold mb-2">포장 방법</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setPackaging("stick")}
                className={`flex-1 h-[40px] leading-[40px] inline-block text-xs rounded-lg border transition-colors ${
                  packaging === "stick"
                    ? "border-action-secondary font-bold"
                    : "border-border-default text-text-secondary"
                }`}
              >
                스틱
              </button>
              <button
                onClick={() => setPackaging("bulk")}
                className={`flex-1 h-[40px] leading-[40px] inline-block text-xs rounded-lg border transition-colors ${
                  packaging === "bulk"
                    ? "border-action-secondary font-bold"
                    : "border-border-default text-text-secondary"
                }`}
              >
                벌크
              </button>
            </div>
          </div>

          {/* 중량 (Weight) */}
          <div>
            <h3 className="text-sm leading-[20px] font-bold mb-2">중량</h3>
            <div className="relative">
              <select
                disabled={packaging === ""}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={`w-full h-[40px] text-xs text-text-secondary pl-4 pr-2 border border-border-default rounded-lg appearance-none bg-white ${
                  packaging === "" && "cursor-not-allowed"
                }`}
              >
                <option value="">중량을 선택해주세요.</option>
                <option value="250g">15g X 15</option>
                <option value="500g">15g X 33</option>
                <option value="1kg">15g X 66</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke={"var(--icon-default)"}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 선택 완료 버튼 */}

          {isButtonsDisabled ? (
            <button
              onClick={handleComplete}
              className="w-full mt-2 py-3 bg-action-disabled text-text-disabled rounded-lg font-bold leading-[24px] cursor-not-allowed"
            >
              선택 완료
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full mt-2 py-3 bg-linear-gradient text-white rounded-lg font-bold leading-[24px]"
            >
              선택 완료
            </button>
          )}
        </div>
      </ActionSheet>
    </>
  );
};

export default OrderSelectOption;
