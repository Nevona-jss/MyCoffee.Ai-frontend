"use client";
import React, { useState, useEffect } from "react";

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setIsOpening(false);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const handleClose = () => {
    closeModal();
  };

  // Handle opening animation
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Trigger opening animation
      setTimeout(() => {
        setIsOpening(true);
      }, 10); // Small delay to ensure DOM is ready
    } else {
      setIsOpening(false);
    }
  }, [isOpen]);

  // Close modal on escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/20 z-50 flex items-end transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      {/* Modal Content */}
      <div
        className={`bg-white w-full max-w-sm mx-auto rounded-t-2xl p-4 pt-3 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-out ${
          isClosing ? "translate-y-full" : isOpening ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Handle */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-16 h-[5px] bg-[#9CA3AF] rounded-full cursor-pointer" 
            onClick={handleClose}
          ></div>
        </div>
 


        {/* Title */}
        {title && (
          <h2 className="text-xl text-center font-heading font-bold text-h3 leading-h3 ">
            {title}
          </h2>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default ActionSheet;
