'use client';

import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

const warningIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_1366_13821)">
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
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    personalInfo: false,
    terms: false,
    marketing: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthDate: '',
    phone: '',
    verificationCode: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthDate: '',
    phone: '',
    verificationCode: '',
  });
  const router = useRouter();

  const handleAllAgree = () => {
    const newValue = !isAllAgreed;
    setIsAllAgreed(newValue);
    setAgreements({
      personalInfo: newValue,
      terms: newValue,
      marketing: newValue
    });
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    const newAgreements = { ...agreements, [key]: !agreements[key] };
    setAgreements(newAgreements);
    setIsAllAgreed(Object.values(newAgreements).every(Boolean));
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) {
          error = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = '이메일이 올바르게 입력되지 않았습니다.';
        }
        break;
      case 'password':
        if (!value) {
          error = '비밀번호를 입력해주세요.';
        } else if (value.length < 8) {
          error = '비밀번호는 8자 이상이어야 합니다.';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = '비밀번호를 다시 입력해주세요.';
        } else if (value !== formData.password) {
          error = '비밀번호가 일치하지 않습니다.';
        }
        break;
      case 'name':
        if (!value) {
          error = '이름을 입력해주세요.';
        }
        break;
      case 'birthDate':
        if (!value) {
          error = '생년월일을 입력해주세요.';
        }
        break;
      case 'phone':
        if (!value) {
          error = '휴대폰 번호를 입력해주세요.';
        } else if (!/^[0-9]{10,11}$/.test(value.replace(/\s/g, ''))) {
          error = '올바른 휴대폰 번호를 입력해주세요.';
        }
        break;
      case 'verificationCode':
        if (!value) {
          error = '인증 번호를 입력해주세요.';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegister = () => {
    const fields = ['email', 'password', 'confirmPassword', 'name', 'birthDate'];
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        console.log("field", field);
        isValid = false;
      }
    });
    console.log("isValid", isValid);
    console.log("isAllAgreed", isAllAgreed);
    
    if (isValid && isAllAgreed) {
      router.push('/auth/register/success');
    }
  };



  return (
    <div className="h-max">
      <Header />
      {/* Register Form */}
      <div className="py-6 px-4 text-gray-0">
        {/* Email Input */}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-0">
            이메일
          </label>
          <input
            type="email"
            id="email"
            className={`bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border text-gray-0 text-sm rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-[9px] ${errors.email ? 'border-[#EF4444]' : 'border-[#E6E6E6]'
              }`}
            placeholder="이메일을 입력하세요."
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
          {errors.email && (
            <div className="flex items-center gap-1 mt-2">
              {warningIcon()}
              <span className="text-[#EF4444] text-[10px] font-normal">{errors.email}</span>
            </div>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-0">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border text-gray-0 text-sm rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-[9px] ${errors.password ? 'border-[#EF4444]' : 'border-[#E6E6E6]'
                }`}
              placeholder="비밀번호를 입력해주세요."
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2.06202 12.348C1.97868 12.1235 1.97868 11.8765 2.06202 11.652C2.87372 9.68385 4.25153 8.00103 6.02079 6.81689C7.79004 5.63275 9.87106 5.00061 12 5.00061C14.129 5.00061 16.21 5.63275 17.9792 6.81689C19.7485 8.00103 21.1263 9.68385 21.938 11.652C22.0214 11.8765 22.0214 12.1235 21.938 12.348C21.1263 14.3161 19.7485 15.999 17.9792 17.1831C16.21 18.3672 14.129 18.9994 12 18.9994C9.87106 18.9994 7.79004 18.3672 6.02079 17.1831C4.25153 15.999 2.87372 14.3161 2.06202 12.348Z" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10.733 5.07599C13.0624 4.7984 15.4186 5.29081 17.4419 6.47804C19.4652 7.66527 21.0442 9.48207 21.938 11.651C22.0214 11.8755 22.0214 12.1225 21.938 12.347C21.5705 13.238 21.0848 14.0755 20.494 14.837" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.084 14.158C13.5182 14.7045 12.7604 15.0069 11.9738 15C11.1872 14.9932 10.4348 14.6777 9.87856 14.1215C9.32233 13.5652 9.00683 12.8128 8.99999 12.0262C8.99316 11.2396 9.29554 10.4818 9.84201 9.91602" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.479 17.499C16.1525 18.2848 14.6725 18.776 13.1394 18.9394C11.6063 19.1028 10.056 18.9345 8.59365 18.4459C7.13133 17.9573 5.79121 17.1599 4.66423 16.1078C3.53725 15.0556 2.64977 13.7734 2.06202 12.348C1.97868 12.1235 1.97868 11.8765 2.06202 11.652C2.94865 9.50186 4.50869 7.69725 6.50802 6.509" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 2L22 22" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center gap-1 mt-2">
              {warningIcon()}
              <span className="text-[#EF4444] text-[10px] font-normal">{errors.password}</span>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-gray-0">
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={`bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border text-gray-0 text-sm rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-[9px] ${errors.confirmPassword ? 'border-[#EF4444]' : 'border-[#E6E6E6]'
                }`}
              placeholder="비밀번호를 다시 입력해주세요."
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2.06202 12.348C1.97868 12.1235 1.97868 11.8765 2.06202 11.652C2.87372 9.68385 4.25153 8.00103 6.02079 6.81689C7.79004 5.63275 9.87106 5.00061 12 5.00061C14.129 5.00061 16.21 5.63275 17.9792 6.81689C19.7485 8.00103 21.1263 9.68385 21.938 11.652C22.0214 11.8765 22.0214 12.1235 21.938 12.348C21.1263 14.3161 19.7485 15.999 17.9792 17.1831C16.21 18.3672 14.129 18.9994 12 18.9994C9.87106 18.9994 7.79004 18.3672 6.02079 17.1831C4.25153 15.999 2.87372 14.3161 2.06202 12.348Z" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10.733 5.07599C13.0624 4.7984 15.4186 5.29081 17.4419 6.47804C19.4652 7.66527 21.0442 9.48207 21.938 11.651C22.0214 11.8755 22.0214 12.1225 21.938 12.347C21.5705 13.238 21.0848 14.0755 20.494 14.837" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.084 14.158C13.5182 14.7045 12.7604 15.0069 11.9738 15C11.1872 14.9932 10.4348 14.6777 9.87856 14.1215C9.32233 13.5652 9.00683 12.8128 8.99999 12.0262C8.99316 11.2396 9.29554 10.4818 9.84201 9.91602" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.479 17.499C16.1525 18.2848 14.6725 18.776 13.1394 18.9394C11.6063 19.1028 10.056 18.9345 8.59365 18.4459C7.13133 17.9573 5.79121 17.1599 4.66423 16.1078C3.53725 15.0556 2.64977 13.7734 2.06202 12.348C1.97868 12.1235 1.97868 11.8765 2.06202 11.652C2.94865 9.50186 4.50869 7.69725 6.50802 6.509" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 2L22 22" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center gap-1 mt-2">
              {warningIcon()}
              <span className="text-[#EF4444] text-[10px] font-normal">{errors.confirmPassword}</span>
            </div>
          )}
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-0">
            이름
          </label>
          <input
            type="text"
            id="name"
            className="bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border border-[#E6E6E6] text-gray-0 text-sm rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-[9px]"
            placeholder="이름을 입력하세요."
            defaultValue=""
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        {/* Date of Birth Input */}
        <div className="mb-4">
          <label htmlFor="birthDate" className="block mb-2 text-sm font-bold text-gray-0">
            생년월일
          </label>
          <div className="relative">
            <input
              type="date"
              id="birthDate"
              className="date-input-custom bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border border-[#E6E6E6] text-gray-0 text-sm rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-[9px] pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              defaultValue="2001-07-11"
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              required
            />
            <div className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('birthDate') as HTMLInputElement;
                  input.focus();
                  input.showPicker?.();
                }}
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
        </div>

        {/* Gender Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-0">
            성별
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                className="w-4 h-4 !text-[#FF7939] bg-transparent border-2 border-[#B3B3B3]"
                defaultChecked
              />
              <span className="text-[12px] font-normal text-gray-0">남자</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                className="w-4 h-4 !text-[#FF7939] bg-transparent border-2 border-[#B3B3B3]"
              />
              <span className="text-[12px] font-normal text-gray-0">여자</span>
            </label>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-0">
            휴대폰 번호
          </label>
          <div className="flex gap-1">
            <div className="flex-1">
              <input
                type="tel"
                id="phone"
                className="w-full bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border border-[#E6E6E6] text-gray-0 text-sm rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] px-4 py-[9px]"
                placeholder="0000000000"
                onChange={(e) => {
                  const button = document.getElementById('phoneButton') as HTMLButtonElement;
                  if (e.target.value.trim() === '') {
                    button.disabled = true;
                  } else {
                    button.disabled = false;
                  }
                }}
                required
              />
            </div>
            <button
              type="button"
              id="phoneButton"
              className="px-4 py-2.5 border border-[#4E2A18] text-[#4E2A18] text-sm leading-[18px] rounded-lg font-bold hover:bg-[#532E19] cursor-pointer hover:text-white transition-colors disabled:opacity-50 disabled:bg-[#E6E6E6] disabled:text-gray-700 disabled:border-[#E6E6E6] disabled:hover:bg-[#E6E6E6] disabled:hover:text-gray-700"
              disabled
            >
              인증 요청
            </button>
          </div>
        </div>

        {/* Verification Code Input */}
        <div className="mb-4">
          <label htmlFor="verificationCode" className="block mb-2 text-sm font-bold text-gray-0">
            인증 번호
          </label>
          <div className="flex gap-1">
            <input
              type="text"
              id="verificationCode"
              className="flex-1 bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border border-[#E6E6E6] text-gray-0 text-sm rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] px-4 py-[9px]"
              placeholder="인증 번호를 입력하세요."
              onChange={(e) => {
                const button = document.getElementById('verifyButton') as HTMLButtonElement;
                if (e.target.value.trim() === '') {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              }}
              required
            />
            <button
              type="button"
              id="verifyButton"
              className="px-4 py-2.5 border border-[#4E2A18] text-[#4E2A18] text-sm leading-[18px] rounded-lg font-bold hover:bg-[#532E19] cursor-pointer hover:text-white transition-colors disabled:opacity-50 disabled:bg-[#E6E6E6] disabled:text-gray-700 disabled:border-[#E6E6E6] disabled:hover:bg-[#E6E6E6] disabled:hover:text-gray-700"
              disabled
            >
              인증 요청
            </button>
          </div>
        </div>

        {/* Agreement Checkboxes */}
        <div className="mb-6">
          {/* All Agree */}
          <div className="flex items-center mb-4 border-b border-[#E6E6E6] pb-4">
            <input
              id="allAgree"
              type="checkbox"
              className="cursor-pointer auth-checkbox w-5 h-5 bg-transparent border border-[#B3B3B3] rounded focus:ring-[#FF7939] focus:ring-0"
              style={{ accentColor: '#FF7939' }}
              checked={isAllAgreed}
              onChange={handleAllAgree}
            />
            <label htmlFor="allAgree" className="ml-2 text-sm text-gray-0 font-normal cursor-pointer">
              전체 동의
            </label>
          </div>

          {/* Individual Agreements */}
          <div className="space-y-2.5 px-2">
            <div className="flex items-center justify-between h-[28px]">
              <div className="flex items-center">
                <input
                  id="personalInfo"
                  type="checkbox"
                  className="cursor-pointer auth-checkbox w-5 h-5 bg-transparent border border-[#B3B3B3] rounded focus:ring-[#FF7939] focus:ring-0"
                  style={{ accentColor: '#FF7939' }}
                  checked={agreements.personalInfo}
                  onChange={() => handleAgreementChange('personalInfo')}
                />
                <label htmlFor="personalInfo" className="ml-2 text-sm text-gray-0 cursor-pointer">
                  개인정보 수집 및 이용 동의 (필수)
                </label>
              </div>
              <button className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#1A1A1A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between h-[28px]">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="cursor-pointer auth-checkbox w-5 h-5 bg-transparent border border-[#B3B3B3] rounded focus:ring-[#FF7939] focus:ring-0"
                  style={{ accentColor: '#FF7939' }}
                  checked={agreements.terms}
                  onChange={() => handleAgreementChange('terms')}
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-0 cursor-pointer">
                  이용약관 동의 (필수)
                </label>
              </div>
              <button className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#1A1A1A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between h-[28px]">
              <div className="flex items-center">
                <input
                  id="marketing"
                  type="checkbox"
                  className="cursor-pointer auth-checkbox w-5 h-5 bg-transparent border border-[#B3B3B3] rounded focus:ring-[#FF7939] focus:ring-0"
                  style={{ accentColor: '#FF7939' }}
                  checked={agreements.marketing}
                  onChange={() => handleAgreementChange('marketing')}
                />
                <label htmlFor="marketing" className="ml-2 text-sm text-gray-0 cursor-pointer">
                  개인정보 마케팅 활용 동의 (선택)
                </label>
              </div>
              <button className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#1A1A1A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <button
          className={`w-full font-medium transition-colors ${isAllAgreed ? 'btn-primary' : 'btn-primary-empty bg-[#E6E6E6] text-[#9CA3AF] hover:bg-[#E6E6E6] !cursor-not-allowed'}`}
          disabled={!isAllAgreed}
          onClick={handleRegister}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
