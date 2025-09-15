'use client';

import { useState } from 'react';

const warningIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0_1366_13821)">
        <path d="M7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00001C14.6666 4.31811 11.6818 1.33334 7.99992 1.33334C4.31802 1.33334 1.33325 4.31811 1.33325 8.00001C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667Z" stroke="#EF4444" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 5.33334V8.00001" stroke="#EF4444" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10.6667H8.00667" stroke="#EF4444" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1366_13821">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

interface DatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export default function DatePicker({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  className = '',
  placeholder = ''
}: DatePickerProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    // Format display for Korean format (년/월/일)
    if (inputValue) {
      const [year, month, day] = inputValue.split('-');
      const formattedValue = `${year}/${month}/${day}`;
      
      // Create overlay for formatted display
      const overlay = document.createElement('div');
      overlay.textContent = formattedValue;
      overlay.className = 'absolute inset-0 flex items-center px-4 pointer-events-none text-gray-0 text-[12px] font-bold z-20';
      overlay.id = 'date-overlay';
      
      // Remove existing overlay
      const existingOverlay = e.target.parentElement?.querySelector('#date-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }
      
      // Add new overlay
      e.target.parentElement?.appendChild(overlay);
      e.target.style.color = 'transparent'; // Hide original input text
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const openDatePicker = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.focus();
      input.showPicker?.();
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block mb-2 text-[12px] font-bold text-gray-0">
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          id={id}
          className={`date-input-custom bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border text-gray-0 text-[12px] rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-2.5 pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${error ? 'border-[#EF4444]' : 'border-[#E6E6E6]'
            }`}
          value={value}
          onChange={handleDateChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
        />
        <div className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={openDatePicker}
            className="cursor-pointer p-1 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V6" stroke="#B3B3B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 2V6" stroke="#B3B3B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#B3B3B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10H21" stroke="#B3B3B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-2">
          {warningIcon()}
          <span className="text-[#EF4444] text-[10px] font-normal">{error}</span>
        </div>
      )}
    </div>
  );
}
