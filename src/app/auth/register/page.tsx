'use client';

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "../components/PasswordInput";
import DatePicker from "../components/DatePicker";
import { useHeaderStore } from "@/stores/header-store";

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
export default function Register() {
  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "회원가입",
      showBackButton: true,
    });
  }, [setHeader]);

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
        isValid = false;
      }
    });
    if (isValid && isAllAgreed) {
      router.push('/auth/register/success');
    }
  };

  return (
    <div className="">
      <Header />
      {/* Register Form */}
      <div className="p-4 pb-10 text-gray-0">
        {/* Email Input */}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-[12px] font-bold text-gray-0 leading-[16px]">
            이메일
          </label>
          <input
            type="email"
            id="email"
            className={`bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border text-gray-0 text-[12px] rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-2.5 ${errors.email ? 'border-[#EF4444]' : 'border-[#E6E6E6]'
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
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          error={errors.password}
          required
        />

        <PasswordInput
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요."
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange('confirmPassword', value)}
          error={errors.confirmPassword}
          required
        />

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-[12px] font-bold text-gray-0 leading-[16px]">
            이름
          </label>
          <input
            type="text"
            id="name"
            className="bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border border-[#E6E6E6] text-gray-0 text-[12px] rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] block w-full px-4 py-2.5"
            placeholder="비밀번호를 입력해주세요."
            defaultValue=""
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>




        <DatePicker
          id="birthDate"
          label="생년월일"
          value={formData.birthDate}
          onChange={(value) => handleInputChange('birthDate', value)}
          error={errors.birthDate}
          placeholder="년도 / 월 / 일"
          required
        />

        {/* Gender Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-[12px] font-bold text-gray-0 leading-[16px]">
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
          <label htmlFor="phone" className="block mb-2 text-[12px] font-bold text-gray-0 leading-[16px]">
            휴대폰 번호
          </label>
          <div className="flex gap-1">
            <div className="flex-1">
              <input
                type="tel"
                id="phone"
                className="w-full bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border border-[#E6E6E6] text-gray-0 text-[12px] rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] px-4 py-2.5"
                placeholder="휴대폰 번호를 입력해주세요."
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
              className="px-4 py-[9px] border border-[#4E2A18] text-[#4E2A18] text-sm leading-[20px] rounded-lg font-bold cursor-pointer disabled:bg-[#E6E6E6] disabled:text-[#9CA3AF] disabled:border-[#E6E6E6] disabled:hover:bg-[#E6E6E6] disabled:hover:cursor-not-allowed"
              disabled
            >
              인증 요청
            </button>
          </div>
        </div>

        {/* Verification Code Input */}
        <div className="mb-4">
          <label htmlFor="verificationCode" className="block mb-2 text-[12px] font-bold text-gray-0 leading-[16px]">
            인증 번호
          </label>
          <div className="flex gap-1">
            <input
              type="text"
              id="verificationCode"
              className="flex-1 bg-transparent placeholder:text-[#6E6E6E] placeholder:font-normal font-bold border border-[#E6E6E6] text-gray-0 text-[12px] rounded-lg focus:outline-none focus:ring-[#FF7939] focus:border-[#FF7939] px-4 py-2.5"
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
              className="px-4 py-[9px] border border-[#4E2A18] text-[#4E2A18] text-sm leading-[20px] rounded-lg font-bold cursor-pointer disabled:bg-[#E6E6E6] disabled:text-[#9CA3AF] disabled:border-[#E6E6E6] disabled:hover:bg-[#E6E6E6] disabled:hover:cursor-not-allowed"
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
            <label htmlFor="allAgree" className="ml-2 text-[12px] text-gray-0 font-normal cursor-pointer">
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
                <label htmlFor="personalInfo" className="ml-2 text-[12px] text-gray-0 cursor-pointer">
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
                <label htmlFor="terms" className="ml-2 text-[12px] text-gray-0 cursor-pointer">
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
                <label htmlFor="marketing" className="ml-2 text-[12px] text-gray-0 cursor-pointer">
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
          className={`w-full btn-primary`}
          disabled={!isAllAgreed}
          onClick={handleRegister}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
