"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./CoffeeBrewingAnimation.css";

interface CoffeeBrewingAnimationProps {
  onComplete: () => void;
}

const CoffeeBrewingAnimation: React.FC<CoffeeBrewingAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      text: "취향을 블렌딩하는 중입니다",
      duration: 2000
    },
    {
      text: "마지막 한 방울까지 정성스럽게 담는 중",
      duration: 2000
    },
    {
      text: "거의 다 되었어요, 곧 당신의 커피가 찾아옵니다",
      duration: 2000
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Animation completed, show final result
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 1000);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="coffee-brewing-container">
      <div className="coffee-machine-wrapper">
        <Image
          src="/images/coffee-machine.png"
          alt="Coffee Machine"
          width={249}
          height={282}
          className="coffee-machine-image"
        />
      </div>

      <p className="brewing-text">
        {steps[currentStep].text}
        <span className="loading-dots">
          <span className="dot dot-1">.</span>
          <span className="dot dot-2">.</span>
          <span className="dot dot-3">.</span>
        </span>
      </p>
    </div>
  );
};

export default CoffeeBrewingAnimation;
